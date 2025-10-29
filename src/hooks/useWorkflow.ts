import { useAtom, useAtomValue } from 'jotai';
import { cloneDeep } from 'lodash';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { nodeInitializeProperties } from '../components/Workflow/constants/workflow.constants';
import type {
  CustomNode,
  DecisionNodeType,
  EdgeStatus,
  IFlowContext,
  MergeNodeType,
  NodeExecute,
  NodeStatus,
  TaskNodeType,
} from '../components/Workflow/types';
import { executeDecisionNode } from '../components/Workflow/utils/simulations/decisionExecutor';
import { executeDefaultNode } from '../components/Workflow/utils/simulations/defaultExecutor';
import { executeMergeNode } from '../components/Workflow/utils/simulations/mergeExecutor';
import { executeTaskNode } from '../components/Workflow/utils/simulations/taskExecutor';
import {
  createEdgeId,
  createHandleId,
  createNodeId,
  nodeCounterAtom,
} from '../components/Workflow/utils/workflowIdUtils';
import { edgesAtom, type CustomEdge } from '../state/edges';
import {
  activeNodeIdAtom,
  isDecisionNode,
  isMergeNode,
  isTaskNode,
  nodesAtom,
} from '../state/nodes';
import { selectedNodeAtom } from '../state/selectedNode';
import { currentWorkflowAtom } from '../state/workflow';
import { tCommon } from '../utils/i18nUtils';
import { useUpdateNode } from './useNodeUpdater';

export const useWorkflow = () => {
  const execStopRef = useRef(false);
  const [currentWorkflow, setWorkflow] = useAtom(currentWorkflowAtom);

  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  //  애니메이션색칠용
  const [, setActiveNodeId] = useAtom(activeNodeIdAtom);
  const selectedNode = useAtomValue(selectedNodeAtom);

  const [counter, setCounter] = useAtom(nodeCounterAtom);

  // 시물레이션 상태관리용
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'paused'>('idle');
  /**
   * 테스트용
   * @param ms
   * @returns
   */
  const delay = (ms: number) =>
    new Promise<void>((resolve) => {
      let acc = 0;
      const interval = 100;

      const tick = () => {
        if (pauseRef.current) {
          setTimeout(tick, interval);
          return;
        }
        acc += interval;
        if (acc >= ms) resolve();
        else setTimeout(tick, interval);
      };

      tick();
    });

  // 리렌더링 필요없으므로 useref로 처리함
  const executionId = useRef(0);
  const pauseRef = useRef(false);
  const { updateNode } = useUpdateNode();

  /**
   * 애니메이션에서 사용하는 상태값 변경
   * @param nodeId
   * @param status NodeStatus
   */
  const updateNodeStatus = (nodeId: string, status: NodeStatus) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    updateNode(node.id, { ...node.data, status });
  };
  /**
   * 애니메이션에서 사용하는 상태값 변경
   * @param edgeId
   * @param status EdgeStatus
   */
  const updateEdgeStatus = (edgeId: string, status: EdgeStatus) => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === edgeId ? { ...e, data: { ...e.data, status, label: e?.data?.label ?? '' } } : e
      )
    );
  };
  /**
   * 애니메이션에서 사용하는 context 업데이트
   * @param nodeId
   * @param status NodeStatus
   */
  const updateNodeContext = (nodeId: string, context: IFlowContext) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    updateNode(node.id, { ...node.data, context });
  };
  const simulateExecution = async (startId: string, context?: IFlowContext) => {
    if (execStopRef.current) return;
    attachExecuteHandlers(nodes);
    const visited = new Set<string>();
    const execId = ++executionId.current;
    setExecutionState('running');
    context ??= { nodeResults: {}, globals: {}, edgeStatusMap: {} };
    nodes.forEach((n) => (n.data.status = 'waiting'));
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        data: { ...e.data, status: 'waiting', label: e?.data?.label ?? '' },
      }))
    );

    const getOutgoingEdges = (nodeId: string) => edges.filter((e) => e.source === nodeId); // 최신 edgesAtom 상태 사용

    const walk = async (nodeId: string, prevNodeId?: string) => {
      if (execId !== executionId.current || execStopRef.current) return;
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      context.current = {
        prevNodeId,
      };

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      updateNodeStatus(node.id, 'running');
      setActiveNodeId(nodeId);

      let outgoingEdges = getOutgoingEdges(node.id);

      // DecisionNode: 선택된 edge만
      if (isDecisionNode(node)) {
        const conditionList = node.data.condition || [];
        const matchedCondition = conditionList.find((cond) => {
          if (!cond.expression) return false;
          try {
            const match = new Function('context', `return context?.${cond.expression}`);
            const prevId = context?.current?.prevNodeId as string;
            const prevResult = context.nodeResults[prevId];
            return match(prevResult);
          } catch {
            return false;
          }
        });
        let selectedEdge: CustomEdge | undefined;
        if (matchedCondition) {
          selectedEdge = outgoingEdges.find((e) => e.target === matchedCondition.targetNodeId);
        } else if (node.data.fallbackTarget) {
          selectedEdge = outgoingEdges.find((e) => e.target === node.data.fallbackTarget);
        }

        if (selectedEdge) {
          outgoingEdges = [selectedEdge];
        } else {
          outgoingEdges = [];
        }
      }

      // edge running 처리
      outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'running'));

      await delay(500);

      try {
        if (isTaskNode(node)) {
          await executeTaskNode(node, context, edges, walk);
        } else if (isDecisionNode(node)) {
          await executeDecisionNode(node, context, edges, walk);
        } else if (isMergeNode(node)) {
          await executeMergeNode(node, context, edges, walk, nodes);
        } else {
          await executeDefaultNode(node, edges, walk);
        }
      } catch (err) {
        updateNodeStatus(node.id, 'failed');
        throw err;
      }
      //정지 발생시 상태 업데이트 중단
      if (execStopRef.current) return;
      updateNodeStatus(node.id, 'done');

      // edge done 처리
      await Promise.all(outgoingEdges.map((e) => updateEdgeStatus(e.id, 'done')));

      // 병렬로 다음 node 처리 (StartNode, MergeNode 등)
      await Promise.all(outgoingEdges.map((e) => walk(e.target, nodeId)));
    };

    await walk(startId);
    setExecutionState('idle');
  };

  const createExecuteTask = (node: TaskNodeType): NodeExecute => {
    return async (context) => {
      const inputKey = node.data.inputSource;
      const input = inputKey
        ? (context.nodeResults[inputKey] ?? context.globals[inputKey])
        : undefined;

      const url = inputKey;
      let result: any;
      switch (node.data.taskType) {
        case 'http':
          if (url) {
            try {
              const res = await fetch(url);
              result = await res.json();
            } catch (err) {
              toast.error(`HTTP 실패 ${url}: ${err}`);
              result = { error: err };
              context.nodeResults[node.id] = result;
              updateNodeContext(node.id, context);
              throw err;
            }
          } else {
            result = { error: 'url 없음' };
            context.nodeResults[node.id] = result;
            updateNodeContext(node.id, context);
          }
          break;
        case 'db':
          result = { rows: [{ id: 1, name: '테스트  row' }] };
          context.nodeResults[node.id] = result;
          updateNodeContext(node.id, context);
          break;
        case 'script':
          try {
            // input을 context와 함께 전달, JS 코드로 처리 가능
            if (
              typeof input === 'string' ||
              typeof input === 'number' ||
              typeof input === 'object'
            ) {
              // 단순 eval 예시 (실제 사용 시 sandbox 필요)
              result = new Function('input', 'context', `return ${input}`)(input, context);
            } else {
            }
          } catch (err) {
            console.error(`스크립트 실패:`, err);
            result = { error: err };
            context.nodeResults[node.id] = result;
            updateNodeContext(node.id, context);
            throw err;
          }
          break;
        default:
          result = input;
      }

      // nodeResults에 저장
      context.nodeResults[node.id] = result;
    };
  };

  const createExecuteDecision = (node: DecisionNodeType): NodeExecute => {
    return async (context) => {
      const conditions = node.data.condition || [];
      let selectedEdgeLabel: string | undefined;

      for (const cond of conditions) {
        if (!cond.expression) continue;
        try {
          const match = new Function('context', `return ${cond.expression}`)(context);
          if (match) {
            selectedEdgeLabel = cond.label;
            break;
          }
        } catch (err) {
          throw err;
        }
      }

      if (!selectedEdgeLabel) {
        selectedEdgeLabel = node.data.fallbackTarget;
      }

      if (context.edgeStatusMap) {
        context.edgeStatusMap[node.id] = selectedEdgeLabel ? 'running' : 'waiting';
      }
    };
  };

  const createExecuteMerge = (node: MergeNodeType): NodeExecute => {
    return async (context) => {
      const incomingResults = node.data.inputs?.map((id) => context.nodeResults[id]) ?? [];
      context.nodeResults[node.id] = incomingResults.flat();
    };
  };

  const createExecuteDefault = (node: CustomNode): NodeExecute => {
    return async (context) => {
      context.nodeResults[node.id] = { status: 'passed' };
    };
  };

  // ============================
  // 2️⃣ attachExecuteHandlers
  // ============================

  const attachExecuteHandlers = (nodes: CustomNode[]) => {
    for (const node of nodes) {
      switch (node.type) {
        case 'task':
          node.data.execute = createExecuteTask(node as TaskNodeType);
          break;
        case 'decision':
          node.data.execute = createExecuteDecision(node as DecisionNodeType);
          break;
        case 'merge':
          node.data.execute = createExecuteMerge(node as MergeNodeType);
          break;
        default:
          node.data.execute = createExecuteDefault(node);
      }
    }
  };

  /**
   * 시물레이션 상태 초기화
   */
  const resetSimulation = () => {
    nodes.forEach((n) => updateNodeStatus(n.id, 'waiting'));
    setExecutionState('idle');
  };
  /**
   * 시물레이션 시작
   */
  const runSimulation = (startNodeId: string) => {
    execStopRef.current = false;
    simulateExecution(startNodeId);
  };
  /**
   * 시물레이션 멈춤
   */
  const pauseExecution = () => {
    setExecutionState('paused');
    pauseRef.current = true;
  };
  /**
   * 시물레이션 이어하기
   */
  const resumeExecution = () => {
    setExecutionState('running');
    pauseRef.current = false;
  };
  /**
   * 시물레이션 중지
   */
  const stopExecution = () => {
    execStopRef.current = true;
    setExecutionState('idle');
    setActiveNodeId(null);
    executionId.current += 1; // 현재 실행 중인 시뮬레이션 중단 신호
    nodes.forEach((n) => updateNodeStatus(n.id, 'waiting')); // 상태 초기화
    edges.forEach((e) => updateEdgeStatus(e.id, 'waiting'));
  };
  /**
   * workflow에 새로운 노드 추가
   */
  const updateWorkflow = (node: CustomNode) => {
    setWorkflow((prev) => ({ ...prev, nodes: [...prev.nodes, node] }));
  };
  /**
   * 작업 노드 추가
   */
  const addTaskNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'task',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: tCommon('node.task') },
    };
    updateWorkflow(newTaskNode);
    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * 시작 노드 추가
   */
  const addStartNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'start',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: tCommon('node.start') },
    };
    updateWorkflow(newTaskNode);
    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * 종료 노드 추가
   */
  const addEndNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'end',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: tCommon('node.end') },
    };
    updateWorkflow(newTaskNode);
    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * 병합 노드 추가
   */
  const addMergeNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'merge',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: tCommon('node.merge') },
    };
    updateWorkflow(newTaskNode);
    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * 의사결정 노드 추가
   */
  const addDecisionNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'decision',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: tCommon('node.decision') },
    };
    updateWorkflow(newTaskNode);
    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * JSON EXPORTER
   */
  const exportWorkflowJSON = () => {
    const dataStr = JSON.stringify(currentWorkflow, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();

    URL.revokeObjectURL(url);
  };
  const copyNode = (newId: string) => {
    if (!selectedNode) return;
    const copiedNode: CustomNode = cloneDeep(selectedNode);
    setNodes((prev) => [...prev, { ...copiedNode, label: newId }]);
  };

  const deleteNode = (id: string) => {
    if (!selectedNode) return;
    setNodes((prev) => [...prev.filter((node) => node.data.label === id)]);
  };

  const reassignNodeIds = (nodes: CustomNode[]) => {
    const oldToNew: Record<string, string> = {};

    const newNodes = nodes.map((node) => {
      const newId = createNodeId(
        node.type,
        () => counter,
        (_, val) => setCounter(val)
      );
      oldToNew[node.id] = newId;

      return { ...node, id: newId, data: { ...node.data } };
    });

    return { newNodes, oldToNew };
  };

  const reassignEdgeIds = (edges: CustomEdge[], oldToNew: Record<string, string>) => {
    return edges.map((edge) => {
      const newSource = oldToNew[edge.source] || edge.source;
      const newTarget = oldToNew[edge.target] || edge.target;

      // 핸들을 createHandleId로 안전하게 생성
      const newSourceHandle = createHandleId(
        newSource,
        edge.sourceHandle?.endsWith('source') ? 'out' : 'out'
      );
      const newTargetHandle = createHandleId(
        newTarget,
        edge.targetHandle?.endsWith('top') ? 'in' : 'in'
      );

      return {
        ...edge,
        id: createEdgeId(newSource, newSourceHandle, newTarget, newTargetHandle),
        source: newSource,
        sourceHandle: newSourceHandle,
        target: newTarget,
        targetHandle: newTargetHandle,
      };
    });
  };

  return {
    copyNode,
    deleteNode,
    executionState,
    runSimulation,

    resetSimulation,
    pauseExecution,
    resumeExecution,
    stopExecution,
    // addNode,
    addStartNode,
    addEndNode,
    addMergeNode,
    addDecisionNode,
    addTaskNode,
    exportWorkflowJSON,
    reassignNodeIds,
    reassignEdgeIds,
  };
};

// useKeyboradController 작업필요

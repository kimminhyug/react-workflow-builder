import { useAtom, useAtomValue } from 'jotai';
import { cloneDeep } from 'lodash';
import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { nodeInitializeProperties } from '../components/Workflow/constants/workflow.constants';
import type {
  CustomNode,
  EdgeStatus,
  IFlowContext,
  NodeStatus,
} from '../components/Workflow/types';
import { executeDecisionNode } from '../components/Workflow/utils/simulations/decisionExecutor';
import { executeDefaultNode } from '../components/Workflow/utils/simulations/defaultExecutor';
import { executeMergeNode } from '../components/Workflow/utils/simulations/mergeExecutor';
import { executeSwitchNode } from '../components/Workflow/utils/simulations/switchExecutor';
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
  isSwitchNode,
  isTaskNode,
  nodesAtom,
} from '../state/nodes';
import { selectedNodeAtom } from '../state/selectedNode';
import { useUpdateNode } from './useNodeUpdater';

export const useWorkflow = () => {
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

  const simulateExecution = async (startId: string, context?: IFlowContext) => {
    const visited = new Set<string>();
    const execId = ++executionId.current;

    context ??= { nodeResults: {}, globals: {}, edgeStatusMap: {} };
    nodes.forEach((n) => (n.data.status = 'waiting'));
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        data: { ...e.data, status: 'waiting', label: e?.data?.label ?? '' },
      }))
    );

    const updateEdgeStatus = (edgeId: string, status: EdgeStatus) => {
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edgeId ? { ...e, data: { ...e.data, status, label: e?.data?.label ?? '' } } : e
        )
      );
    };

    const getOutgoingEdges = (nodeId: string) => edges.filter((e) => e.source === nodeId); // 최신 edgesAtom 상태 사용

    const walk = async (nodeId: string) => {
      if (execId !== executionId.current) return;
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      node.data.status = 'running';
      setActiveNodeId(nodeId);

      let outgoingEdges = getOutgoingEdges(node.id);

      // DecisionNode: 선택된 edge만
      if (isDecisionNode(node)) {
        const conditionList = node.data.condition || [];
        const matchedCondition = conditionList.find((cond) => {
          if (!cond.expression) return false;
          try {
            return new Function('context', `return ${cond.expression}`)(context);
          } catch {
            return false;
          }
        });
        const selectedEdgeId = matchedCondition
          ? outgoingEdges.find((e) => e.data?.label === matchedCondition.label)?.id
          : node.data.fallbackTarget;
        outgoingEdges = outgoingEdges.filter((e) => e.id === selectedEdgeId);
      }

      // SwitchNode: 선택된 edge만
      if (isSwitchNode(node) && node.data.expression) {
        let value: any;
        try {
          value = new Function('context', `return ${node.data.expression}`)(context);
        } catch {
          value = undefined;
        }
        const selectedEdgeId = outgoingEdges.find(
          (e) => e.data?.label?.toLowerCase() === String(value)?.toLowerCase()
        )?.id;
        outgoingEdges = outgoingEdges.filter((e) => e.id === (selectedEdgeId || ''));
        // fallbackTarget edge 포함 가능
        if (outgoingEdges.length === 0 && node.data.fallbackTarget) {
          outgoingEdges = outgoingEdges.filter((e) => e.target === node.data.fallbackTarget);
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
        } else if (isSwitchNode(node)) {
          await executeSwitchNode(node, context, edges, walk);
        } else if (isMergeNode(node)) {
          await executeMergeNode(node, context, edges, walk, nodes);
        } else {
          await executeDefaultNode(node, edges, walk);
        }
      } catch (err) {
        console.error(`Execution error on ${node.id}:`, err);
      }
      //음 이거 바꿔야하나
      node.data.status = 'done';

      // edge done 처리
      await Promise.all(outgoingEdges.map((e) => updateEdgeStatus(e.id, 'done')));

      // 병렬로 다음 node 처리 (StartNode, MergeNode 등)
      await Promise.all(outgoingEdges.map((e) => walk(e.target)));
    };

    await walk(startId);
  };

  /**
   * 시물레이션 상태 초기화
   */
  const resetSimulation = () => {
    nodes.forEach((n) => updateNodeStatus(n.id, 'waiting'));
    setExecutionState('idle');
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
    setExecutionState('idle');
    setActiveNodeId(null);
    executionId.current += 1; // 현재 실행 중인 시뮬레이션 중단 신호
    nodes.forEach((n) => updateNodeStatus(n.id, 'waiting')); // 상태 초기화
  };
  /**
   * input 노드 추가
   */
  const addNode = () => {
    // 보류
    return;
    const newNode: CustomNode = {
      id: uuid(),
      data: { label: `Node` },
      type: 'object',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };
  /**
   * 작업 노드 추가
   */
  const addTaskNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'task',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: '새로운 작업' },
    };

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
      data: { ...nodeInitializeProperties, label: 'Start' },
    };

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
      data: { ...nodeInitializeProperties, label: 'End' },
    };

    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * 스위치  노드 추가
   */
  const addSwitchNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'switch',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { ...nodeInitializeProperties, label: 'Switch' },
    };

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
      data: { ...nodeInitializeProperties, label: 'Merge' },
    };

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
      data: { ...nodeInitializeProperties, label: 'Decision' },
    };

    setNodes((nds) => [...nds, newTaskNode]);
  };

  /**
   * JSON EXPORTER
   */
  const exportWorkflowJSON = () => {
    const dataStr = JSON.stringify({ nodes, edges }, null, 2);
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
    simulateExecution,
    resetSimulation,
    pauseExecution,
    resumeExecution,
    stopExecution,
    addNode,
    addStartNode,
    addEndNode,
    addSwitchNode,
    addMergeNode,
    addDecisionNode,
    addTaskNode,
    exportWorkflowJSON,
    reassignNodeIds,
    reassignEdgeIds,
  };
};

// useKeyboradController 작업필요

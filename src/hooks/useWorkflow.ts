import { useAtom, useAtomValue } from 'jotai';
import { cloneDeep, get } from 'lodash';
import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { nodeInitializeProperties } from '../components/Workflow/constants/workflow.constants';
import type { CustomNode, IFlowContext, NodeStatus } from '../components/Workflow/types';
import {
  createEdgeId,
  createHandleId,
  createNodeId,
  nodeCounterAtom,
} from '../components/Workflow/utils/workflowIdUtils';
import { edgesAtom, type CustomEdge } from '../state/edges';
import { activeNodeIdAtom, nodesAtom } from '../state/nodes';
import { selectedNodeAtom } from '../state/selectedNode';
import { useUpdateNode } from './useNodeUpdater';

export const useWorkflow = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges] = useAtom(edgesAtom);
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
   *  시물레이션 실행기
   * @param startId 시물레이션 시작 할 노드 ID
   * @returns void
   */
  const simulateExecution = async (startId: string, context?: IFlowContext) => {
    const visited = new Set<string>();
    const execId = ++executionId.current;
    if (!context) {
      context = {
        nodeResults: {},
        globals: {},
      };
    }

    const walk = async (nodeId: string) => {
      if (execId !== executionId.current) return;
      if (visited.has(nodeId)) return;

      visited.add(nodeId);

      const currentNode = nodes.find((n) => n.id === nodeId);
      if (!currentNode) return;

      // Node 상태 업데이트
      currentNode.data.status = 'running';
      setActiveNodeId(nodeId);
      await delay(500);

      // execute 호출
      if (currentNode.data.execute) {
        try {
          await currentNode.data.execute(context);
        } catch (err) {
          console.error(`Node execute error: ${err}`);
        }
      }

      currentNode.data.status = 'done';

      const nextEdges = edges.filter((e) => e.source === nodeId);

      switch (currentNode.type) {
        case 'task': {
          // TaskNode: 다음 Edge 무조건 이동
          if (nextEdges.length > 0) await walk(nextEdges[0].target);
          return;
        }

        case 'decision': {
          const conditionList = currentNode.data.condition || [];
          let matchedEdge = null;

          for (const cond of conditionList) {
            if (!cond.expression) continue;
            let condResult = false;
            try {
              condResult = new Function('context', `return ${cond.expression}`)(context);
            } catch (err) {
              console.error(`DecisionNode expression error: ${err}`);
            }
            if (condResult) {
              matchedEdge = nextEdges.find((e) => e.data?.label === cond.label);
              break;
            }
          }

          if (matchedEdge) {
            await walk(matchedEdge.target);
          } else if (conditionList.some((c) => c.fallbackTarget)) {
            const fallbackNodeId = conditionList.find((c) => c.fallbackTarget)?.fallbackTarget!;
            await walk(fallbackNodeId);
          } else {
            console.warn(`DecisionNode 조건 불일치 + fallback 없음: ${nodeId}`);
          }
          return;
        }

        case 'switch': {
          const expr = currentNode.data.expression;
          if (!expr) return;

          let value: any;
          try {
            value = new Function('context', `return ${expr}`)(context);
          } catch (err) {
            console.error(`SwitchNode expression error: ${err}`);
            return;
          }

          const edge = nextEdges.find(
            (e) => e.data?.label?.toLowerCase() === String(value).toLowerCase()
          );
          if (edge) {
            await walk(edge.target);
          } else if (currentNode.data.fallbackTarget) {
            await walk(currentNode.data.fallbackTarget);
          } else {
            console.warn(`SwitchNode 조건 불일치 + fallback 없음: ${nodeId}`);
          }
          return;
        }

        case 'merge': {
          const inputIds = currentNode.data.inputs || [];
          const allDone = inputIds.every(
            (id) => nodes.find((n) => n.id === id)?.data.status === 'done'
          );

          if (!allDone) {
            console.log(`MergeNode 대기 중: ${nodeId}`);
            return;
          }

          if (nextEdges.length > 0) await walk(nextEdges[0].target);
          return;
        }

        case 'start':
        case 'end':
        case 'input':
        case 'object': {
          if (nextEdges.length > 0) await walk(nextEdges[0].target);
          return;
        }
      }
    };

    nodes.forEach((n) => (n.data.status = 'waiting'));

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

import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAtom, useAtomValue } from 'jotai';
import { edgesAtom } from '../../../state/edges';
import { nodesAtom, activeNodeIdAtom } from '../../../state/nodes';
import type { NodeStatus, CustomNode } from '../types';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { ControlButton } from './ControlButton';

export const Control = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges] = useAtom(edgesAtom);
  //  애니메이션색칠용
  const [, setActiveNodeId] = useAtom(activeNodeIdAtom);
  const selectedNode = useAtomValue(selectedNodeAtom);

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

  /**
   * 애니메이션에서 사용하는 상태값 변경
   * @param nodeId
   * @param status NodeStatus
   */
  const updateNodeStatus = (nodeId: string, status: NodeStatus) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, status } } : node))
    );
  };

  /**
   *  시물레이션 실행기
   * @param startId 시물레이션 시작 할 노드 ID
   * @returns void
   */
  const simulateExecution = async (startId = 'start') => {
    setExecutionState('running');
    // 일시 중지 상태 리셋
    pauseRef.current = false;
    const visited = new Set<string>();
    // 인덱싱
    const execId = ++executionId.current;
    /**
     *  시물레이션 실제 진행
     * @param nodeId 노드 ID
     * @returns void
     */
    const walk = async (nodeId: string) => {
      if (execId !== executionId.current) return;
      if (visited.has(nodeId)) return;

      visited.add(nodeId);
      updateNodeStatus(nodeId, 'running');
      setActiveNodeId(nodeId);
      await delay(1000);
      updateNodeStatus(nodeId, 'done');

      const currentNode = nodes.find((n) => n.id === nodeId);
      if (!currentNode) return;

      const nextEdges = edges.filter((e) => e.source === nodeId);

      const condition = currentNode.data?.condition?.toLowerCase() || '';
      const fallback: string[] =
        currentNode.data?.fallback?.map((f: string) => f.toLowerCase()) || [];

      const allConditions = [condition, ...fallback];

      const matchedEdge = nextEdges.find(
        (e) => e.data?.label && allConditions.includes(e.data.label.toLowerCase())
      );

      if (matchedEdge) {
        await walk(matchedEdge.target);
      } else {
        // toast 교체 필요
        console.warn(`조건 '${condition}' 실패 `);
      }
    };

    nodes.forEach((n) => updateNodeStatus(n.id, 'waiting'));
    await walk(startId);

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
    const newNode: CustomNode = {
      id: uuid(),
      data: { label: `Node` },
      type: 'input',
      style: { background: '#ececec' },
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
      data: { label: '새로운 작업', taskName: '', status: 'startWaiting' },
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

  return (
    <div className="control-container">
      <div className="control-button-container">
        <div className="control-button-title">현재 flow name?</div>
        <nav className="control-button-menu">
          <ControlButton onClick={addNode}>새 노드 추가</ControlButton>
          <ControlButton onClick={addTaskNode}>작업 노드 추가</ControlButton>
          <ControlButton
            onClick={() => {
              const startNode = nodes.find((node) => node.type === 'start');
              if (startNode) {
                simulateExecution(startNode.id);
              } else {
                alert('시작 노드가 없습니다.');
              }
            }}
          >
            시뮬레이션 시작
          </ControlButton>
          <ControlButton
            onClick={() => simulateExecution(selectedNode?.id ?? '')}
            disabled={executionState === 'running'}
          >
            {`시작(${selectedNode?.data?.label})`}
          </ControlButton>
          <ControlButton onClick={pauseExecution} disabled={executionState !== 'running'}>
            일시정지
          </ControlButton>
          <ControlButton onClick={resumeExecution} disabled={executionState !== 'paused'}>
            재개
          </ControlButton>
          <ControlButton onClick={stopExecution} disabled={executionState !== 'running'}>
            정지
          </ControlButton>
          <ControlButton onClick={exportWorkflowJSON}>워크플로우 저장</ControlButton>
        </nav>
      </div>

      {/* <input
            type="file"
            accept=".json"
            onChange={importWorkflowJSON}
            style={{ marginLeft: 10 }}
          /> */}
    </div>
  );
};

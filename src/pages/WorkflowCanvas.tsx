import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ReactFlow,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type NodeChange,
  type OnNodeDrag,
} from '@xyflow/react';
import { useAtom, useSetAtom } from 'jotai';
import React, { useCallback, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { defaultEdgeOptions } from '../components/Workflow/constants/workflow.constants';
import DefaultEdge from '../components/Workflow/Edges/DefaultEdge';
import { DecisionNode } from '../components/Workflow/Nodes/DecisionNode';
import { EndNode } from '../components/Workflow/Nodes/EndNode';
import { MergeNode } from '../components/Workflow/Nodes/MergeNode';
import { StartNode } from '../components/Workflow/Nodes/StartNode';

import { TaskNode } from '../components/Workflow/Nodes/TaskNode';
import type { CustomNode } from '../components/Workflow/types';
import { canConnect } from '../components/Workflow/utils/edgeConnectionValidator';
import { useUpdateNode } from '../hooks/useNodeUpdater';
import { useSyncNodeData } from '../hooks/useSyncNodeData';
import { edgesAtom, type CustomEdge } from '../state/edges';
import { selectedNodeAtom } from '../state/selectedNode';
import { currentWorkflowAtom } from '../state/workflow';
import { tWarning } from '../utils/i18nUtils';

export const WorkflowCanvas = () => {
  const setWorkflow = useSetAtom(currentWorkflowAtom);
  const [, setSelectedNode] = useAtom(selectedNodeAtom);
  //node data 변경 시 자동 업데이트
  useSyncNodeData();
  const [edges, setEdges] = useAtom(edgesAtom);
  const { nodes, setNodes } = useUpdateNode();

  const { fitView } = useReactFlow();
  const flowWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      fitView({ padding: 0.3 });
    });
    if (flowWrapperRef.current) resizeObserver.observe(flowWrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [fitView]);

  const edgeTypes = {
    default: DefaultEdge,
  };
  const nodeTypes = {
    task: TaskNode,
    start: StartNode,
    end: EndNode,
    decision: DecisionNode,
    merge: MergeNode,
  };

  /**
   * atom으로 node 관리하려면 change 생성 필요하여 생성함
   */
  const onNodesChange = useCallback(
    (changes: NodeChange<CustomNode>[]) => {
      setNodes((nds) => applyNodeChanges<CustomNode>(changes, nds));
    },
    [setNodes]
  );
  /**
   * atom으로 edge 관리하려면 change 생성 필요하여 생성함
   */
  const onEdgesChange = useCallback(
    (changes: EdgeChange<CustomEdge>[]) => {
      setEdges((eds) => applyEdgeChanges<CustomEdge>(changes, eds));
    },
    [setEdges]
  );
  /**
   * 엣지 연결 validation 추가
   * @param connection 연결된 엣지들
   * @returns
   */
  const onConnect = (connection: Connection) => {
    const { source, target } = connection;

    // 순환참조 자기 자신 금지
    if (source === target) {
      alert(tWarning('node.selfConnect'));
      return;
    }

    // 노드 찾기 (nodes는 React 상태 배열)
    const sourceNode = nodes.find((n) => n.id === source);
    const targetNode = nodes.find((n) => n.id === target);

    if (!sourceNode || !targetNode) return;

    // 연결 허용 여부 체크
    if (!canConnect(sourceNode.type, targetNode.type)) {
      alert(
        tWarning('node.invalidConnection', { source: sourceNode.type, target: targetNode.type })
      );
      return;
    }

    //n개가 연결 될수 있게 변경되었으므로 단일 선택 체크 삭제
    // // 기존 연결 중복 체크
    // const exists = edges.some((e) => e.source === source && e.target === target);
    // if (exists) {
    //   alert('이미 연결되어 있는 노드입니다.');
    //   return;
    // }

    const newDefaultEdge: CustomEdge = {
      ...connection,
      id: uuid(),
      type: 'default',
      label: '',
      ...defaultEdgeOptions,
    };

    setEdges((eds) => [...eds, newDefaultEdge]);
    setWorkflow((prev) => ({ ...prev, edges: [...prev.edges, newDefaultEdge] }));
  };

  /**
   * 노드 선택 이벤트 처리용 폼이랑 연동함
   * @param event mouse event
   * @param node 커스텀 노드,
   */
  const onNodeClick = useCallback((_: React.MouseEvent, node: CustomNode) => {
    setSelectedNode(node);
  }, []);
  /**
   * 엣지 클릭 이벤트 틀만 만듬
   * @param event mouse event
   * @param edge 커스텀 엣지
   */
  const onEdgeClick = (event: React.MouseEvent, edge: CustomEdge) => {
    event.stopPropagation();
    console.debug(`source:${edge.source} target: ${edge.target} `);
  };

  const onNodeDragStop: OnNodeDrag<CustomNode> = (_event, node) => {
    setWorkflow((prev) => {
      return {
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n)),
      };
    });
  };

  // const importWorkflowJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     try {
  //       const json = JSON.parse(reader.result as string);
  //       if (json.nodes && json.edges) {
  //         setNodes(json.nodes);
  //         setEdges(json.edges);
  //         setSelectedNode(null);
  //       } else {
  //         // 추후 TOAST로 변경
  //         alert('올바른 워크플로우 JSON이 아닙니다.');
  //       }
  //     } catch {
  //       alert('JSON 파싱 실패 - 예상치 못한 예외');
  //     }
  //   };
  //   reader.readAsText(file);
  // };

  return (
    <div className={'reactflow-wrapper'} ref={flowWrapperRef}>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodeDragStop={onNodeDragStop}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        {/* <MiniMap /> */}
        {/* <Controls /> */}
        <Background />
      </ReactFlow>
    </div>
  );
};

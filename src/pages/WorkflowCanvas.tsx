import React, { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ReactFlow,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react';
import { useAtom } from 'jotai';
import { defaultEdgeOptions } from '../components/Workflow/constants/workflow.constants';
import { Control } from '../components/Workflow/Control/Control';
import DefaultEdge from '../components/Workflow/Edges/DefaultEdge';
import { NodeEditor } from '../components/Workflow/NodeEditor';
import { DefaultNode } from '../components/Workflow/Nodes/DefaultNode';
import type { CustomNode } from '../components/Workflow/types';
import { canConnect } from '../components/Workflow/utils/edgeConnectionValidator';
import { edgesAtom, type CustomEdge } from '../state/edges';
import { nodesAtom } from '../state/nodes';
import { selectedNodeAtom } from '../state/selectedNode';

export const WorkflowCanvas = () => {
  // const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([
  //   { id: '1', type: 'input',position: { x: 250, y: 5 } },
  // ]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const { fitView } = useReactFlow();

  useEffect(() => {
    const handleResize = () => {
      fitView({ padding: 0.3 });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [fitView]);

  const edgeTypes = {
    default: DefaultEdge,
  };
  const nodeTypes = {
    default: DefaultNode,
    task: DefaultNode,
    object: DefaultNode,
    start: DefaultNode,
    end: DefaultNode,
  };
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);

  useEffect(() => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...selectedNode.data } } : node
      )
    );
  }, [selectedNode]);
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
   * @param connection 연결된 엣지들?
   * @returns
   */
  const onConnect = (connection: Connection) => {
    const { source, target } = connection;

    // 순환참조 자기 자신 금지
    if (source === target) {
      alert('같은 노드끼리는 연결할 수 없습니다 .');
      return;
    }

    // 노드 찾기 (nodes는 React 상태 배열)
    const sourceNode = nodes.find((n) => n.id === source);
    const targetNode = nodes.find((n) => n.id === target);

    if (!sourceNode || !targetNode) return;

    // 연결 허용 여부 체크
    if (!canConnect(sourceNode.type, targetNode.type)) {
      alert(`${sourceNode.type} 노드에서 ${targetNode.type} 노드로의 연결은 허용되지 않습니다. `);
      return;
    }

    // 기존 연결 중복 체크
    const exists = edges.some((e) => e.source === source && e.target === target);
    if (exists) {
      alert('이미 연결되어 있는 노드입니다.');
      return;
    }

    const newDefaultEdge: CustomEdge = {
      ...connection,
      id: uuid(),
      type: 'default',
      label: '기본 엣지',
      ...defaultEdgeOptions,
    };

    setEdges((eds) => [...eds, newDefaultEdge]);
  };

  /**
   * 노드 선택 이벤트 처리용 폼이랑 연동함
   * @param event mouse event
   * @param node 커스텀 녿,
   */
  const onNodeClick = useCallback((_: React.MouseEvent, node: CustomNode) => {
    console.debug(node);
    setSelectedNode(node);
  }, []);
  /**
   * 엣지 클릭 이벤트 틀만 만듬
   * @param event mouse event
   * @param edge 커스텀 엣지
   */
  const onEdgeClick = (event: React.MouseEvent, edge: CustomEdge) => {
    event.stopPropagation();
    console.debug(`soruce:${edge.source} target: ${edge.target} `);
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
    <div style={{ display: 'flex', height: 'calc(100% - 60px)', gap: 20 }}>
      <div style={{ flex: 1 }}>
        <Control />
        <ReactFlow
          proOptions={{ hideAttribution: true }}
          nodes={nodes}
          edges={edges}
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
      <NodeEditor />
    </div>
  );
};

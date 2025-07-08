import React, { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react';
import { type CustomNode } from './types';
import { NodeEditor } from './NodeEditor';
import { useAtom } from 'jotai';
import { selectedNodeAtom } from '../../state/selectedNode';
import { edgesAtom, type CustomEdge } from '../../state/edges';
import { nodesAtom } from '../../state/nodes';

import DefaultEdge from './edges/DefaultEdge';
import { defaultEdgeOptions } from './constants/workflow.constants';
import { DefaultNode } from './nodes/DefaultNode';
import { Control } from './Control/Control';

export const WorkflowCanvas = () => {
  // const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([
  //   { id: '1', type: 'input',position: { x: 250, y: 5 } },
  // ]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

  const edgeTypes = {
    default: DefaultEdge,
  };
  const nodeTypes = {
    default: DefaultNode,
    task: DefaultNode,
    input: DefaultNode,
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
   * 공식 문서상으로는 엣지 연결 validation에 사용
   * @param connection 연결된 엣지들?
   * @returns
   */
  const onConnect = (connection: Connection) => {
    // 순환 참조 방지
    if (connection.source === connection.target) return;
    const { source, target } = connection;

    const targetNode = nodes.find((n) => n.id === target);
    if (targetNode?.type === 'start') {
      alert('시작 노드는 입력을 받을 수 없습니다.');
      return;
    }
    if (targetNode?.type === 'end') {
      alert('종료 노드에는 연결할 수 없습니다.');
      return;
    }

    if (source === target) {
      alert('같은 노드끼리는 연결할 수 없습니다.');
      return;
    }

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
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <NodeEditor />
    </div>
  );
};

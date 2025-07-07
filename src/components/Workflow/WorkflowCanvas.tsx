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

let id = 2;

export const WorkflowCanvas = () => {
  // const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([
  //   { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
  // ]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

  const edgeTypes = {
    default: DefaultEdge,
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

  const onNodesChange = useCallback(
    (changes: NodeChange<CustomNode>[]) => {
      setNodes((nds) => applyNodeChanges<CustomNode>(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<CustomEdge>[]) => {
      setEdges((eds) => applyEdgeChanges<CustomEdge>(changes, eds));
    },
    [setEdges]
  );

  const onConnect = (connection: Connection) => {
    // 순환 참조 방지
    if (connection.source === connection.target) return;

    const targetNode = nodes.find((n) => n.id === connection.target);
    if (targetNode?.type === 'end') {
      alert('종료 노드에는 연결할 수 없습니다.');
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

  const addNode = () => {
    const newNode: CustomNode = {
      id: `${id++}`,
      data: { label: `Node ${id}` },
      type: 'input',
      style: { background: '#ececec' },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const addTaskNode = () => {
    const newTaskNode: CustomNode = {
      id: uuid(),
      type: 'task',
      position: { x: 250, y: 250 }, // 원하는 위치
      data: { label: '새로운 작업', taskName: '' },
    };

    setNodes((nds) => [...nds, newTaskNode]);
  };

  const onNodeClick = useCallback((_: React.MouseEvent, node: CustomNode) => {
    console.debug(node);
    setSelectedNode(node);
  }, []);
  const onEdgeClick = (event: React.MouseEvent, edge: CustomEdge) => {
    event.stopPropagation();
    console.debug(`soruce:${edge.source} target: ${edge.target} `);
  };
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
        <div className="control-container">
          <button onClick={addNode}>새 노드 추가</button>
          <button onClick={addTaskNode}>작업 노드 추가</button>
          <button onClick={exportWorkflowJSON}>워크플로우 저장</button>
          {/* <input
            type="file"
            accept=".json"
            onChange={importWorkflowJSON}
            style={{ marginLeft: 10 }}
          /> */}
        </div>
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

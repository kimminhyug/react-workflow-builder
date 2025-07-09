import { selectedNodeAtom } from '../../state/selectedNode';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { TextField } from '@fluentui/react';
import { edgesAtom } from '../../state/edges';
import { nodesAtom } from '../../state/nodes';
import type { CustomNode } from './types';
import { ConditionEditor } from './Editor/ConditionEditor';

export const NodeEditor = () => {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  // 선택한 노드 편집 후 전체 노드에 반영
  useEffect(() => {
    if (!selectedNode) return;
    console.log(selectedNode);
    setNodes((nds: CustomNode[]) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...selectedNode.data } } : node
      )
    );
  }, [selectedNode]);

  const deleteSelectedNode = () => {
    if (!selectedNode) return;

    // 노드 삭제
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));

    // 해당 노드와 연결된 엣지들도 같이 삭제
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
    );

    // 선택 해제
    setSelectedNode(null);
  };

  return (
    <div style={{ width: 300, padding: 10, border: '1px solid #ccc' }}>
      <h3>노드 편집기</h3>
      {selectedNode && (
        <>
          <TextField
            label="이름"
            value={selectedNode.data.label || ''}
            onChange={(e) =>
              setSelectedNode({
                ...selectedNode,
                data: { ...selectedNode.data, label: e.currentTarget.value },
              })
            }
          />

          {selectedNode.type === 'task' && (
            <TextField
              label="작업 이름"
              value={selectedNode.data.taskName || ''}
              onChange={(e) =>
                setSelectedNode({
                  ...selectedNode,
                  data: { ...selectedNode.data, taskName: e.currentTarget.value },
                })
              }
            />
          )}

          <ConditionEditor />
        </>
      )}
      <button
        onClick={deleteSelectedNode}
        style={{ marginTop: 20, backgroundColor: '#ff3434', color: 'white' }}
      >
        노드 삭제
      </button>
    </div>
  );
};

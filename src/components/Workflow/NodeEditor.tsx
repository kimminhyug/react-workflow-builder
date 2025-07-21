import { selectedNodeAtom } from '../../state/selectedNode';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { PrimaryButton, TextField } from '@fluentui/react';
import { edgesAtom } from '../../state/edges';
import { nodesAtom } from '../../state/nodes';
import type { CustomNode } from './types';
import { ConditionEditor } from './Editor/ConditionEditor';
// 스타일즈 하나 만들어야함
const neonTextFieldStyles = {
  fieldGroup: {
    border: '1px solid #61a0f3',
    backgroundColor: '#0f2a48',
    color: '#ffffff',
    boxShadow: '0 0 5px #2381fc',
  },
  field: {
    color: '#ffffff',
  },
  label: {
    color: '#61a0f3',
    textShadow: '0 0 3px #61a0f3',
  },
};

const neonButtonStyles = {
  root: {
    marginTop: 20,
    backgroundColor: '#ff3434',
    color: '#ffffff',
    boxShadow: '0 0 10px #ff3434',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  rootHovered: {
    backgroundColor: '#e62828',
    boxShadow: '0 0 12px #ff3434',
  },
};

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
    <div className="neon-panel">
      <h3 className="neon-title">노드 편집기</h3>

      {selectedNode && (
        <>
          <TextField
            label="이름"
            styles={neonTextFieldStyles}
            value={selectedNode.data.label || ''}
            onChange={(e, newValue) =>
              setSelectedNode({
                ...selectedNode,
                data: { ...selectedNode.data, label: newValue || '' },
              })
            }
          />

          {selectedNode.type === 'task' && (
            <TextField
              label="작업 이름"
              styles={neonTextFieldStyles}
              value={selectedNode.data.taskName || ''}
              onChange={(e, newValue) =>
                setSelectedNode({
                  ...selectedNode,
                  data: { ...selectedNode.data, taskName: newValue || '' },
                })
              }
            />
          )}

          <ConditionEditor />
        </>
      )}

      <PrimaryButton text="노드 삭제" onClick={deleteSelectedNode} styles={neonButtonStyles} />
    </div>
  );
};

import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { selectedNodeAtom } from '../../state/selectedNode';

import { Icon } from '@fluentui/react';
import { edgesAtom } from '../../state/edges';
import { nodesAtom } from '../../state/nodes';
import { neonButtonStyles, neonTextFieldStyles } from '../common/styles';
import { Button } from '../common/UI';
import { TextField } from '../common/UI/Forms/TextField';
import { Tabs } from './Editor/Tabs';
import type { CustomNode } from './types';
// 스타일즈 하나 만들어야함

export const NodeEditor = () => {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);

  const [isOpen, setIsOpen] = useState(true);
  const togglePanel = () => setIsOpen((prev) => !prev);

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
    <div className={`neon-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="neon-panel-side" onClick={togglePanel}>
        <div className="neon-panel-side-button">
          {isOpen ? (
            <Icon iconName="OpenPaneMirrored" title="패널 닫기" />
          ) : (
            <Icon iconName="OpenPane" title="패널 열기" />
          )}
        </div>
      </div>
      {isOpen ? (
        <div>
          <h3 className="neon-title">설정 편집기</h3>
          <Tabs />
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

              {/* <ConditionEditor /> */}
            </>
          )}

          <Button text="노드 삭제" onClick={deleteSelectedNode} styles={neonButtonStyles} />
        </div>
      ) : (
        <div>
          <div>icon </div>
          <div>icon</div>
        </div>
      )}
    </div>
  );
};

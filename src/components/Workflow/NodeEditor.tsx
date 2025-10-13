import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { selectedNodeAtom } from '../../state/selectedNode';

import { Icon } from '@fluentui/react';
import { nodesAtom } from '../../state/nodes';
import { Tabs } from './Editor/Tabs';
import type { CustomNode } from './types';
// 스타일즈 하나 만들어야함

export const NodeEditor = () => {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const setNodes = useSetAtom(nodesAtom);

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

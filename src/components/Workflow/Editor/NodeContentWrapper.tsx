import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import React from 'react';
import { edgesAtom } from '../../../state/edges';
import { nodesAtom } from '../../../state/nodes';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { Button, Label, Stack } from '../../common/UI';
import { neonButtonStyles, neonLabelBase } from '../../common/styles';

interface INodeContentWrapperProps {
  children: React.ReactNode;
  // 필수가 아닌 경우 선택된 노드가 있어야함
  requireNode?: boolean;
}

export const NodeContentWrapper: React.FC<INodeContentWrapperProps> = ({
  children,
  requireNode = true,
}) => {
  const node = useAtomValue(selectedNodeAtom);
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
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
  if (requireNode && !node) {
    return <Label styles={{ root: neonLabelBase }}>노드를 선택해주세요</Label>;
  }

  return (
    <Stack tokens={{ childrenGap: 8, padding: '15px 0px' }}>
      {children}
      <Button text="노드 삭제" onClick={deleteSelectedNode} styles={neonButtonStyles} />
    </Stack>
  );
};

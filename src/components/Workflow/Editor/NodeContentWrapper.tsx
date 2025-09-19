import { useAtomValue } from 'jotai';

import React from 'react';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { Label, Stack } from '../../common/UI';
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

  if (requireNode && !node) {
    return <Label styles={{ root: neonLabelBase }}>노드를 선택해주세요</Label>;
  }

  return <Stack tokens={{ childrenGap: 8, padding: '15px 0px' }}>{children}</Stack>;
};

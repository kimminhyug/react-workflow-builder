import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { Stack } from '../../../common/UI';
import { ConditionList } from './ConditionList';
import { ConditionModal } from './ConditionModal';

export const ConditionEditor = () => {
  const node = useAtomValue(selectedNodeAtom);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }}>
        <ConditionList />
        <ConditionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
      </Stack>
    </>
  );
};

import { useState } from 'react';
import { Stack } from '../../../common/UI';
import { ConditionList } from './ConditionList';
import { ConditionModal } from './ConditionModal';

export const ConditionEditor = () => {
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

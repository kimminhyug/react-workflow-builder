import { useAtomValue } from 'jotai';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { useState } from 'react';
import { ConditionModal } from './ConditionModal';
import { ConditionList } from './ConditionList';
import { Button, Stack } from '../../../common/UI';

export const ConditionEditor = () => {
  const node = useAtomValue(selectedNodeAtom);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }}>
        <h4>{node?.data.label} 조건 관리</h4>
        <Button text="조건 추가" onClick={() => setIsOpen(true)} />
        <ConditionList
          // conditions={conditionList}
          onDelete={function (idx: number): void {
            throw new Error('Function not implemented.');
          }}
        ></ConditionList>
        <ConditionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
      </Stack>
    </>
  );
};

import { PrimaryButton, Stack } from '@fluentui/react';
import { useAtom } from 'jotai';
import { edgesAtom } from '../../../../state/edges';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { useState } from 'react';
import { ConditionModal } from './ConditionModal';
import type { ICondition } from '../../types';
import { ConditionList } from './ConditionList';

export const ConditionEditor = () => {
  const [node, setNode] = useAtom(selectedNodeAtom);

  const conditionList: ICondition[] = (node?.data?.conditionList as ICondition[]) || [];

  const [label, setLabel] = useState('');
  const [type, setType] = useState<string>('primary');
  const [conditionType, setConditionType] = useState<string>('static');

  const addCondition = () => {
    if (!label.trim()) return;
    setNode((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          conditionList: [...conditionList, { label, type, conditionType }],
        },
      };
    });
    setLabel('');
    setType('primary');
    setConditionType('static');
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }}>
        <h4>{node?.data.label} 조건 관리</h4>
        <PrimaryButton text="조건 편집" onClick={() => setIsOpen(true)} />
        <ConditionList
          conditions={conditionList}
          onDelete={function (idx: number): void {
            throw new Error('Function not implemented.');
          }}
        ></ConditionList>
        <ConditionModal
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
          onSave={addCondition}
        ></ConditionModal>
      </Stack>
    </>
  );
};

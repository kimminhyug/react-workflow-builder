import { Stack, IconButton, Modal, PrimaryButton } from '@fluentui/react';

import type { IConditionListProps } from './types';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/Table/Table';
import type { ICondition } from '../../types';
import { neonModalButtonStyles, neonModalStyles, neonModalTitle } from '../../../common/styles';
import { useMemo, useState } from 'react';
import { useTableController } from '../../../common/Table/hook/useTableController';
import { useAtom } from 'jotai';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { ConditionModal } from './ConditionModal';

// conditions props 변경 필요 싱크 불일치

export const ConditionList = ({ onDelete }: IConditionListProps) => {
  const [node, setNode] = useAtom(selectedNodeAtom);
  const [selectedConditionId, setSelectedConditionId] = useState('');
  const conditions: ICondition[] = useMemo(
    () => (node?.data?.conditionList as ICondition[]) || [],
    [node?.data?.conditionList]
  );
  console.log(node);
  const [isOpen, setIsOpen] = useState(false);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

  const onDismiss = () => {
    setIsOpen(false);
  };
  const columns: ColumnDef<ICondition>[] = [
    { accessorKey: 'label', header: '라벨' },
    { accessorKey: 'type', header: 'type' },
    { accessorKey: 'conditionType', header: '조건 타입' },
    { accessorKey: 'dataAccessKey', header: 'dataAccessKey' },
    { accessorKey: 'pattern', header: '패턴' },
    {
      id: 'actions',
      header: '액션',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              // setSelectedConditionId(row.id);
              setIsConditionModalOpen(true);
              setSelectedConditionId(row.original.label);
              update(row.original.label, { label: '새 라벨' });
            }}
          >
            수정
          </button>
          <button onClick={() => remove(row.original.label)}>삭제</button>
        </div>
      ),
    },
    // { accessorKey: 'expression', header: 'expression',  },
  ];
  const { data, add, update, remove } = useTableController<ICondition>({
    api: {},
    data: conditions,
  });

  return (
    <Stack styles={{ root: { fontSize: 14 } }} tokens={{ childrenGap: 8 }}>
      <PrimaryButton onClick={() => setIsOpen(true)} text="조건 상세 보기(돋보기 아이콘 변경)" />
      {conditions.map((condition, idx) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} key={idx}>
          <span style={{ flex: 1 }}>
            {condition.label} ({condition.type} / {condition.conditionType})
          </span>
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            styles={neonModalButtonStyles}
            onClick={() => onDelete(idx)}
          />
        </Stack>
      ))}
      <ConditionModal
        isOpen={isConditionModalOpen}
        onDismiss={() => setIsConditionModalOpen(false)}
        id={selectedConditionId}
      />
      <Modal isOpen={isOpen} onDismiss={onDismiss} isBlocking={false} styles={neonModalStyles}>
        <Stack tokens={{ childrenGap: 15, padding: 5 }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <h3 style={neonModalTitle}>조건 상세 보기</h3>
            <PrimaryButton
              iconProps={{ iconName: 'Cancel' }}
              onClick={onDismiss}
              styles={neonModalButtonStyles}
            />
          </Stack>
          <Table columns={columns} data={data} onClickRow={(e, status) => null} enableRowCheckbox />
        </Stack>
      </Modal>
    </Stack>
  );
};

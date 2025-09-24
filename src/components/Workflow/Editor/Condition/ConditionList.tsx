import type { ColumnDef } from '@tanstack/react-table';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import {
  neonModalButtonStyles,
  neonModalStyles,
  neonModalTitle,
  neonTextFieldStyles,
} from '../../../common/styles';
import { useTableController } from '../../../common/Table/hook/useTableController';
import { Table } from '../../../common/Table/Table';
import { TableActionButtons } from '../../../common/Table/TableActionButtons';
import { Button, IconButton, Modal, Stack, TextField } from '../../../common/UI';
import type { ICondition } from '../../types';
import { ConditionModal } from './ConditionModal';

// conditions props 변경 필요 싱크 불일치

export const ConditionList = () => {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

  const [selectedConditionId, setSelectedConditionId] = useState('');
  const conditions: ICondition[] = useMemo(
    () => (selectedNode?.data?.conditionList as ICondition[]) || [],
    [selectedNode?.data?.conditionList]
  );

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
        <TableActionButtons
          onEdit={() => {
            setIsConditionModalOpen(true);
            setSelectedConditionId(row.original.label);
            update(row.original.label, { label: '새 라벨' });
          }}
          onDelete={() => remove(row.original.label)}
        />
      ),
    },
    // { accessorKey: 'expression', header: 'expression',  },
  ];
  const { data, update, remove } = useTableController<ICondition>({
    api: {},
    data: conditions,
  });

  if (!selectedNode) return <></>;

  return (
    <Stack styles={{ root: { fontSize: 14 } }} tokens={{ childrenGap: 8 }}>
      <TextField
        label="이름"
        styles={neonTextFieldStyles}
        value={selectedNode.data.label || ''}
        onChange={(_e, newValue) =>
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
          onChange={(_e, newValue) =>
            setSelectedNode({
              ...selectedNode,
              data: { ...selectedNode.data, taskName: newValue || '' },
            })
          }
        />
      )}
      <Button text="조건 추가" onClick={() => setIsOpen(true)} />
      <Button onClick={() => setIsOpen(true)} text="조건 상세 보기(돋보기 아이콘 변경)" />
      {data.map((condition, idx) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} key={idx}>
          <span style={{ flex: 1 }}>
            {condition.label} ({condition.type} / {condition.conditionType})
          </span>
          <IconButton
            icon="Delete"
            styles={neonModalButtonStyles}
            onClick={() => remove(condition.label)}
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
            <Button
              iconProps={{ iconName: 'Cancel' }}
              onClick={onDismiss}
              styles={neonModalButtonStyles}
            />
          </Stack>
          <Table columns={columns} data={data} onClickRow={() => null} enableRowCheckbox />
        </Stack>
      </Modal>
    </Stack>
  );
};

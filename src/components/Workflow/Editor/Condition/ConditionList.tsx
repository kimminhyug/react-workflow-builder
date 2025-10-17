import type { ColumnDef } from '@tanstack/react-table';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { tCommon } from '../../../../utils/i18nUtils';
import {
  neonModalButtonStyles,
  neonModalStyles,
  neonModalTitle,
  neonTextFieldStyles,
} from '../../../common/styles';
import { useTableController } from '../../../common/Table/hook/useTableController';
import { Table } from '../../../common/Table/Table';
import { TableActionButtons } from '../../../common/Table/TableActionButtons';
import { Button, IconButton, Modal, Stack } from '../../../common/UI';
import { TextFieldController } from '../../../Form/TextFieldController';
import type { ICondition } from '../../types';
import { ConditionModal } from './ConditionModal';

export const ConditionList = () => {
  const [selectedNode] = useAtom(selectedNodeAtom);

  const [selectedConditionId, setSelectedConditionId] = useState('');
  const conditions: ICondition[] = useMemo(
    () => (selectedNode?.data?.conditionList as ICondition[]) || [],
    [selectedNode?.data?.conditionList]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

  const onDismiss = () => setIsOpen(false);

  const columns: ColumnDef<ICondition>[] = [
    { accessorKey: 'label', header: tCommon('condition.label') },
    { accessorKey: 'type', header: tCommon('condition.type') },
    { accessorKey: 'conditionType', header: tCommon('condition.conditionType') },
    { accessorKey: 'dataAccessKey', header: tCommon('condition.dataAccessKey') },
    { accessorKey: 'pattern', header: tCommon('condition.pattern') },
    {
      id: 'actions',
      header: tCommon('condition.actions'),
      cell: ({ row }) => (
        <TableActionButtons
          onEdit={() => {
            setIsConditionModalOpen(true);
            setSelectedConditionId(row.original.label);
            update(row.original.label, { label: tCommon('condition.newLabel') });
          }}
          onDelete={() => remove(row.original.label)}
        />
      ),
    },
  ];

  const { data, update, remove } = useTableController<ICondition>({
    api: {},
    data: conditions,
  });

  if (!selectedNode) return <></>;

  return (
    <Stack styles={{ root: { fontSize: 14 } }} tokens={{ childrenGap: 8 }}>
      <TextFieldController
        name="label"
        label={tCommon('condition.name')}
        styles={neonTextFieldStyles}
        value={selectedNode.data.label || ''}
        // onChange={(_e, newValue) =>
        //   setSelectedNode({
        //     ...selectedNode,
        //     data: { ...selectedNode.data, label: newValue || '' },
        //   })
        // }
      />

      {selectedNode.type === 'task' && (
        <TextFieldController
          name="taskName"
          label={tCommon('condition.taskName')}
          styles={neonTextFieldStyles}
          value={selectedNode.data.taskName || ''}
          // onChange={(_e, newValue) =>
          //   setSelectedNode({
          //     ...selectedNode,
          //     data: { ...selectedNode.data, taskName: newValue || '' },
          //   })
          // }
        />
      )}

      <Button text={tCommon('condition.add')} onClick={() => setIsConditionModalOpen(true)} />
      <Button text={tCommon('condition.viewDetails')} onClick={() => setIsOpen(true)} />

      {data.map((condition, idx) => (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} key={idx}>
          <span style={{ flex: 1 }}>
            {condition.label} ({condition.conditionType})
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
            <h3 style={neonModalTitle}>{tCommon('condition.details')}</h3>
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

import { Stack, IconButton, Modal, PrimaryButton } from '@fluentui/react';

import type { IConditionListProps } from './types';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../../common/Table/Table';
import type { ICondition } from '../../types';
import { neonModalButtonStyles, neonModalStyles, neonModalTitle } from '../../../common/styles';
import { useState } from 'react';

export const ConditionList = ({ conditions, onDelete }: IConditionListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onDismiss = () => {
    setIsOpen(false);
  };
  const columns: ColumnDef<ICondition>[] = [
    { accessorKey: 'label', header: '라벨' },
    { accessorKey: 'type', header: 'type' },
    { accessorKey: 'conditionType', header: '조건 타입' },
    { accessorKey: 'dataAccessKey', header: 'dataAccessKey' },
    { accessorKey: 'pattern', header: '패턴' },
    // { accessorKey: 'expression', header: 'expression',  },
  ];

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
          <Table columns={columns} data={conditions} />
        </Stack>
      </Modal>
    </Stack>
  );
};

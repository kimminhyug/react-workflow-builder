import type { ColumnDef } from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createCondition } from '../../../../state/nodes';
import { tCommon, tError } from '../../../../utils/i18nUtils';
import { neonModalStyles, neonModalTitle } from '../../../common/styles';
import { Table } from '../../../common/Table/Table';
import { Button, IconButton, Modal, Stack } from '../../../common/UI';
import { DropdownController } from '../../../Form/DropdownController';
import { TargetNodeDropdownController } from '../../../Form/TargetNodeDropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';
import type { ICondition } from '../../types';

interface IConditionModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

interface IConditionGeneric {
  condition: ICondition[];
}
export const ConditionModal = ({ isOpen, onDismiss }: IConditionModalProps) => {
  const { control, watch, formState, trigger } = useFormContext<IConditionGeneric>();
  const { fields, append, remove } = useFieldArray<IConditionGeneric>({
    control,
    name: 'condition',
  });
  const watchedConditions = watch('condition');
  const { t, i18n } = useTranslation();

  const columns: ColumnDef<ICondition, any>[] = useMemo(
    () => [
      {
        header: t('condition.label'),
        accessorKey: 'label',
        id: 'label',
        cell: ({ row }) => <TextFieldController name={`condition.${row.index}.label`} />,
      },
      {
        header: t('condition.targetNode'),
        accessorKey: 'targetNodeId',
        id: 'targetNodeId',
        cell: ({ row }) => (
          <TargetNodeDropdownController
            name={`condition.${row.index}.targetNodeId`}
            placeholder={t('condition.targetNode')}
          />
        ),
      },

      {
        header: t('condition.conditionType'),
        accessorKey: 'conditionType',
        id: 'conditionType',
        cell: ({ row }) => {
          return (
            <DropdownController
              name={`condition.${row.index}.conditionType`}
              options={[
                { key: 'static', text: 'Static' },
                { key: 'regex', text: 'Regex' },
                { key: 'expression', text: 'Expression' },
              ]}
            />
          );
        },
      },
      {
        header: t('condition.expression'),
        accessorKey: 'expression',
        id: 'expression',
        cell: ({ row }) => {
          const type = watchedConditions[row.index]?.conditionType;

          if (type !== 'expression') return null;
          return <TextFieldController name={`condition.${row.index}.expression`} />;
        },
      },
      {
        header: t('condition.pattern'),
        accessorKey: 'pattern',
        id: 'pattern',
        cell: ({ row }) => {
          const type = watchedConditions[row.index]?.conditionType;
          if (type !== 'regex') return <>미지원</>;
          return <TextFieldController name={`condition.${row.index}.pattern`} />;
        },
      },
      {
        header: t('condition.staticValue'),
        accessorKey: 'staticValue',
        id: 'staticValue',
        cell: ({ row }) => {
          const type = watchedConditions[row.index]?.conditionType;
          if (type !== 'static') return <>미지원</>;
          return <TextFieldController name={`condition.${row.index}.staticValue`} />;
        },
      },
      {
        header: '',
        id: 'action',
        cell: ({ row }) => (
          <IconButton
            onClick={() => remove(row.index)}
            title={t('delete')}
            icon={'Delete'}
          ></IconButton>
        ),
      },
    ],
    [watchedConditions, i18n.language]
  );

  const onCancel = () => {
    trigger();
    if (!isEmpty(formState.errors)) {
      toast.error(tError('modal.cannotCloseModal'));
      return;
    }
    onDismiss();
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onCancel}
      isBlocking={false}
      isModeless
      className="custom-modal"
      styles={neonModalStyles}
    >
      <Stack tokens={{ childrenGap: 15, padding: 3 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <h3 style={neonModalTitle}>{tCommon('condition.add')}</h3>
          <Button iconProps={{ iconName: 'Cancel' }} onClick={onCancel} />
        </Stack>

        <Table columns={columns} data={fields} enableRowCheckbox />

        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Button
            text={tCommon('condition.add')}
            onClick={() => {
              append({
                ...createCondition(),
              });
              trigger();
            }}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

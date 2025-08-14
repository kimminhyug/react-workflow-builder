import {
  ComboBox,
  Dropdown,
  IconButton,
  Modal,
  PrimaryButton,
  Stack,
  TextField,
  type IDropdownOption,
} from '@fluentui/react';
import { useAtom } from 'jotai';
import { edgesAtom } from '../../../../state/edges';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import {
  neonCaretDownButtonStyles,
  neonComboBoxOptionStyles,
  neonComboBoxStyles,
  neonDropdownStyles,
  neonModalButtonStyles,
  neonModalStyles,
  neonModalTitle,
} from '../../../common/styles';
import type { ICondition } from '../../types';
import { typeOptions, conditionTypeOptions } from '../Editor.constants';
import { useState } from 'react';
import { neonTextFieldStyles } from '../../../common/styles';
import { ConditionList } from './ConditionList';
import { ConditionModal } from './ConditionModal';

export const ConditionEditor = () => {
  const [node, setNode] = useAtom(selectedNodeAtom);
  const [edges] = useAtom(edgesAtom);

  const edgeLabels: string[] = Array.from(
    new Set(edges.map((e) => e?.data?.label).filter(Boolean))
  ) as string[];

  const options: IDropdownOption<{ key: string; text: string }>[] = edgeLabels.map((label) => ({
    key: label,
    text: label,
  }));

  const conditionList: ICondition[] = (node?.data?.conditionList as ICondition[]) || [];

  const selectedPrimary = conditionList.find((c) => c.type === 'primary')?.label;

  const selectedFallback = conditionList.filter((c) => c.type === 'fallback').map((c) => c.label);

  const onPrimaryChange = (_e: any, option?: IDropdownOption) => {
    const label = option?.key?.toString() || '';
    setNode((prev) => {
      if (!prev) return prev;
      const fallbackItems = ((prev.data.conditionList as ICondition[]) || []).filter(
        (c: ICondition) => c.type === 'fallback'
      );
      return {
        ...prev,
        data: {
          ...prev.data,
          conditionList: [{ label, type: 'primary', conditionType: 'static' }, ...fallbackItems],
        },
      };
    });
  };

  const onFallbackChange = (_e: any, option?: IDropdownOption) => {
    if (!option) return;
    const key = option.key.toString();
    const isSelected = option.selected;

    setNode((prev) => {
      if (!prev) return prev;
      const prevList = (prev.data.conditionList as ICondition[]) || [];
      const primary = prevList.find((c: ICondition) => c.type === 'primary');
      let fallbackList = prevList.filter((c: ICondition) => c.type === 'fallback');

      if (isSelected) {
        const exists = fallbackList.some((f) => f.label === key);
        if (!exists) {
          fallbackList = [
            ...fallbackList,
            { label: key, type: 'fallback', conditionType: 'static' },
          ];
        }
      } else {
        fallbackList = fallbackList.filter((f) => f.label !== key);
      }

      return {
        ...prev,
        data: {
          ...prev.data,
          conditionList: [primary, ...fallbackList].filter(Boolean),
        },
      };
    });
  };

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

  const removeCondition = (index: number) => {
    setNode((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          conditionList: conditionList.filter((_, i) => i !== index),
        },
      };
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }}>
        <h4>{node?.data.label} 조건 관리</h4>
        <PrimaryButton text="조건 편집" onClick={() => setIsOpen(true)} />

        <ConditionModal
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
          onSave={addCondition}
        ></ConditionModal>
      </Stack>
    </>
  );
};

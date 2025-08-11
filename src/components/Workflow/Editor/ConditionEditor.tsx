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
import { edgesAtom } from '../../../state/edges';
import { selectedNodeAtom } from '../../../state/selectedNode';
import {
  neonCaretDownButtonStyles,
  neonComboBoxOptionStyles,
  neonComboBoxStyles,
  neonDropdownStyles,
  neonModalCloseButtonStyles,
  neonModalStyles,
  neonModalTitle,
} from '../../common/styles';
import type { ICondition } from '../types';
import { typeOptions, conditionTypeOptions } from './Editor.constants';
import { useState } from 'react';
import { neonTextFieldStyles } from '../../common/styles';

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
      <ComboBox
        label="분기"
        allowFreeform
        comboBoxOptionStyles={neonComboBoxOptionStyles}
        options={options}
        styles={neonComboBoxStyles}
        caretDownButtonStyles={neonCaretDownButtonStyles}
        selectedKey={selectedPrimary || ''}
        onChange={onPrimaryChange}
        text={selectedPrimary || ''}
      />
      <Dropdown
        label="fallback"
        multiSelect
        styles={neonDropdownStyles}
        options={options.filter((o) => o.key !== selectedPrimary)}
        selectedKeys={selectedFallback}
        onChange={onFallbackChange}
      />

      <Stack tokens={{ childrenGap: 8 }}>
        <h4>{node?.data.label} 조건 관리</h4>
        <PrimaryButton text="조건 편집" onClick={() => setIsOpen(true)} />
        <Modal
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
          isBlocking={false}
          styles={neonModalStyles}
        >
          <Stack horizontal horizontalAlign="space-between">
            <h3 style={neonModalTitle}>{node?.data.label} 조건 편집</h3>
            <IconButton
              styles={neonModalCloseButtonStyles}
              iconProps={{ iconName: 'Cancel' }}
              onClick={() => setIsOpen(false)}
            />
          </Stack>

          <Stack tokens={{ childrenGap: 12 }}>
            <h4>현재 조건</h4>
            {conditionList.length === 0 ? (
              <div>조건이 없어요.</div>
            ) : (
              conditionList.map((c, idx) => (
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} key={idx}>
                  <span style={{ flex: 1 }}>
                    {c.label} ({c.type} / {c.conditionType})
                  </span>
                  <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    onClick={() => removeCondition(idx)}
                  />
                </Stack>
              ))
            )}

            <h4>조건 추가</h4>
            <TextField
              label="Label"
              value={label}
              styles={neonTextFieldStyles}
              onChange={(_, v) => setLabel(v || '')}
            />
            <Dropdown
              label="Type"
              options={typeOptions}
              selectedKey={type}
              styles={neonDropdownStyles}
              onChange={(_, o) => setType(o?.key as string)}
            />
            <Dropdown
              label="Condition Type"
              options={conditionTypeOptions}
              selectedKey={conditionType}
              styles={neonDropdownStyles}
              onChange={(_, o) => setConditionType(o?.key as string)}
            />
            <PrimaryButton text="추가" onClick={addCondition} />
          </Stack>
        </Modal>
      </Stack>
    </>
  );
};

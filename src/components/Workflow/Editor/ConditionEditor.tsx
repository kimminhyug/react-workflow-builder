import { ComboBox, Dropdown, type IDropdownOption } from '@fluentui/react';
import { useAtom } from 'jotai';
import { edgesAtom } from '../../../state/edges';
import { selectedNodeAtom } from '../../../state/selectedNode';
import {
  neonCaretDownButtonStyles,
  neonComboBoxOptionStyles,
  neonComboBoxStyles,
  neonDropdownStyles,
} from '../../common/styles';
import type { ICondition } from '../types';

// 타입 정의

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
    </>
  );
};

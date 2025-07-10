import { ComboBox, Dropdown, type IDropdownOption } from '@fluentui/react';
import { useAtom } from 'jotai';
import { edgesAtom } from '../../../state/edges';
import { selectedNodeAtom } from '../../../state/selectedNode';

export const ConditionEditor = () => {
  const [node, setNode] = useAtom(selectedNodeAtom);
  const [edges] = useAtom(edgesAtom);

  //중복 제거
  const edgeLabels = Array.from(new Set(edges.map((e) => e?.data?.label).filter(Boolean)));
  const options = edgeLabels
    .filter((label): label is string => typeof label === 'string' && label?.length > 0)
    .map((label) => ({ key: label, text: label }));

  const fallbackOptions = edgeLabels
    .filter(
      (label): label is string =>
        typeof label === 'string' && label?.length > 0 && label !== node?.data.condition
    )
    .map((label) => ({ key: label, text: label }));

  const onChange = (value: string) => {
    setNode((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          condition: value,
        },
      };
    });
  };

  const onChangeFallback = (_e: any, option?: IDropdownOption) => {
    if (!option) return;
    const key = option.key.toString();
    const isSelected = option.selected;

    setNode((prev) => {
      if (!prev) return prev;
      const currentFallback = prev.data.fallback || [];

      const nextFallback = isSelected
        ? [...new Set([...currentFallback, key])]
        : currentFallback.filter((item) => item !== key);

      return {
        ...prev,
        data: {
          ...prev.data,
          fallback: nextFallback,
        },
      };
    });
  };

  return (
    <>
      {/* 추후 컴포넌트 관리하기 편하게 한번 감싸야함 */}
      <ComboBox
        label={'분기'}
        allowFreeform
        options={options}
        disabled={options.length === 0}
        selectedKey={node?.data.condition || ''}
        onChange={(_e, option) => onChange(option?.key?.toString() || '')}
        text={node?.data.condition || ''}
      />
      <Dropdown
        label="fallback"
        multiSelect
        options={fallbackOptions}
        selectedKeys={node?.data.fallback || []}
        onChange={onChangeFallback}
      />
    </>
  );
};

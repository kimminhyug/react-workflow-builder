import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import {
  neonButtonStyles,
  neonDropdownStyles,
  neonModalButtonStyles,
  neonModalStyles,
  neonModalTitle,
  neonTextFieldStyles,
} from '../../../common/styles';
import { Button, Dropdown, Modal, Stack, TextField } from '../../../common/UI';
import type { ConditionType, ICondition } from '../../types';
import { conditionTypeOptions } from '../Editor.constants';
interface IConditionModalProps {
  isOpen: boolean; // 모달 열림
  onDismiss: () => void; // 모달 닫기
  id?: string;
  // eslint-disable-next-line no-unused-vars
  onSave?: (condition: ICondition) => void; // 저장 시 호출되는 콜백, (condition 타입)
}

const initData: ICondition = {
  conditionType: 'static',
  label: '',
  type: 'primary',
  pattern: '',
  expression: '',
  dataAccessKey: '',
  id: uuidv4(),
};

export const ConditionModal = ({ isOpen, onDismiss, onSave, id }: IConditionModalProps) => {
  const [node, setNode] = useAtom(selectedNodeAtom);
  const conditionList: ICondition[] = (node?.data?.conditionList as ICondition[]) || [];
  // const item = conditionList.find((condition) => condition.label === id);
  const [item, setItem] = useState(initData);
  const { conditionType, label, dataAccessKey, pattern, expression, id: originId } = item;

  useEffect(() => {
    if (conditionList.length >= 1 && id) {
      const selectedItem = conditionList.find((condition) => condition.label === id);
      if (selectedItem) setItem(selectedItem);
    }
  }, [id]);

  const addCondition = (condition: ICondition) => {
    if (!condition.label.trim()) return;
    setNode((prev) => {
      if (!prev) return prev;

      const conditionList: ICondition[] = (prev.data?.conditionList as ICondition[]) || [];
      const index = conditionList.findIndex((c) => c.label === condition.label);
      let newList;
      if (index >= 0) {
        // 기존 조건 수정
        newList = [...conditionList];
        newList[index] = condition;
      } else {
        // add용
        newList = [...conditionList, condition];
      }

      return {
        ...prev,
        data: {
          ...prev.data,
          conditionList: newList,
        },
      };
    });
  };

  const setLabel = (label: string) => {
    setItem((prev) => ({ ...prev, label }));
  };
  const setDataAccessKey = (dataAccessKey: string) => {
    setItem((prev) => ({ ...prev, dataAccessKey }));
  };
  const setConditionType = (conditionType: ConditionType) => {
    setItem((prev) => ({ ...prev, conditionType }));
  };
  const setPattern = (pattern: string) => {
    setItem((prev) => ({ ...prev, pattern }));
  };
  const setExpression = (expression: string) => {
    setItem((prev) => ({ ...prev, expression }));
  };

  const handleSave = () => {
    const base: ICondition = {
      label,
      type: 'primary',
      conditionType,
      dataAccessKey,
      id: id || originId,
    };
    //정규식
    if (conditionType === 'regex') {
      addCondition({ ...base, pattern });
      onSave && onSave({ ...base, pattern });
      //코드형인데 eval은 보안상 좀 그렇고 검토 필요
    } else if (conditionType === 'expression') {
      addCondition({ ...base, expression });
      onSave && onSave({ ...base, expression });
    } else {
      addCondition({ ...base, pattern });
      onSave && onSave(base);
    }
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} isBlocking={false} styles={neonModalStyles}>
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <h3 style={neonModalTitle}>조건 추가</h3>
          <Button
            iconProps={{ iconName: 'Cancel' }}
            onClick={onDismiss}
            styles={neonModalButtonStyles}
          />
        </Stack>

        <TextField
          label="Label"
          value={item.label}
          onChange={(_, v) => setLabel(v || '')}
          styles={neonTextFieldStyles}
        />
        <TextField
          label="Data AccessKey"
          value={item.dataAccessKey}
          onChange={(_, v) => setDataAccessKey(v || '')}
          styles={neonTextFieldStyles}
        />
        <Dropdown
          label="Condition Type"
          options={conditionTypeOptions}
          selectedKey={conditionType}
          onChange={(_, option) => setConditionType(option?.key as any)}
          styles={neonDropdownStyles}
        />

        {item.conditionType === 'regex' && (
          <>
            <TextField
              label="Pattern"
              value={item.pattern}
              onChange={(_, v) => setPattern(v || '')}
              styles={neonTextFieldStyles}
            />
          </>
        )}

        {item.conditionType === 'expression' && (
          <TextField
            label="Expression"
            value={item.expression}
            onChange={(_, v) => setExpression(v || '')}
            styles={neonTextFieldStyles}
            multiline
          />
        )}

        <Button text="저장" onClick={handleSave} styles={neonButtonStyles} />
      </Stack>
    </Modal>
  );
};

import { useState } from 'react';
import { Modal, Stack, TextField, Dropdown, PrimaryButton } from '@fluentui/react';
import {
  neonModalStyles,
  neonModalTitle,
  neonTextFieldStyles,
  neonDropdownStyles,
  neonButtonStyles,
  neonModalButtonStyles,
} from '../../common/styles';
import { conditionTypeOptions } from './Editor.constants';
import type { ICondition } from '../types';
interface IConditionModalProps {
  isOpen: boolean; // 모달 열림
  onDismiss: () => void; // 모달 닫기
  // eslint-disable-next-line no-unused-vars
  onSave: (condition: ICondition) => void; // 저장 시 호출되는 콜백, (condition 타입)
}

export const ConditionModal = ({ isOpen, onDismiss, onSave }: IConditionModalProps) => {
  const [conditionType, setConditionType] = useState<'static' | 'regex' | 'expression'>('static');
  const [label, setLabel] = useState('');
  const [dataAccessKey, setDataAccessKey] = useState('');
  const [pattern, setPattern] = useState('');
  const [expression, setExpression] = useState('');

  const handleSave = () => {
    const base: ICondition = { label, type: 'primary', conditionType, dataAccessKey };
    //정규식
    if (conditionType === 'regex') {
      onSave({ ...base, pattern });
      //코드형인데 eval은 보안상 좀 그렇고 검토 필요
    } else if (conditionType === 'expression') {
      onSave({ ...base, expression });
    } else {
      onSave(base);
    }
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} isBlocking={false} styles={neonModalStyles}>
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <h3 style={neonModalTitle}>조건 추가</h3>
          <PrimaryButton
            iconProps={{ iconName: 'Cancel' }}
            onClick={onDismiss}
            styles={neonModalButtonStyles}
          />
        </Stack>

        <TextField
          label="Label"
          value={label}
          onChange={(_, v) => setLabel(v || '')}
          styles={neonTextFieldStyles}
        />
        <TextField
          label="Data AccessKey"
          value={dataAccessKey}
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

        {conditionType === 'regex' && (
          <>
            <TextField
              label="Pattern"
              value={pattern}
              onChange={(_, v) => setPattern(v || '')}
              styles={neonTextFieldStyles}
            />
          </>
        )}

        {conditionType === 'expression' && (
          <TextField
            label="Expression"
            value={expression}
            onChange={(_, v) => setExpression(v || '')}
            styles={neonTextFieldStyles}
            multiline
          />
        )}

        <PrimaryButton text="저장" onClick={handleSave} styles={neonButtonStyles} />
      </Stack>
    </Modal>
  );
};

import { Stack, IconButton } from '@fluentui/react';
import { neonModalButtonStyles } from '../../../common/styles';
import type { IConditionListProps } from './types';

export const ConditionList = ({ conditions, onDelete }: IConditionListProps) => {
  return (
    <Stack tokens={{ childrenGap: 8 }}>
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
    </Stack>
  );
};

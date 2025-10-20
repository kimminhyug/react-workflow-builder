import React from 'react';

import { TagPicker, type ITag } from '../../../common/UI';
import type { ICondition } from '../../types';

interface IConditionTagPickerProps {
  conditions: ICondition[];
}

export const ConditionTagPicker: React.FC<IConditionTagPickerProps> = ({ conditions }) => {
  const tags: ITag[] = conditions.map((cond) => ({
    key: cond.id,
    name: `${cond.label} (${cond.conditionType})`,
  }));

  return (
    <TagPicker
      selectedItems={tags}
      onResolveSuggestions={() => []}
      //item 삭제 버튼이 컨트롤이 되지 않아 스타일에서 X버튼 비활성화
      styles={{ input: { display: 'none' } }}
      disabled
      pickerSuggestionsProps={{
        showRemoveButtons: false,
      }}
    />
  );
};

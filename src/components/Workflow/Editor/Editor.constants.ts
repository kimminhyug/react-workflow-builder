import type { IDropdownOption } from '../../common/UI';

export const typeOptions: IDropdownOption[] = [
  { key: 'primary', text: 'Primary' },
  { key: 'fallback', text: 'Fallback' },
];

export const conditionTypeOptions: IDropdownOption[] = [
  { key: 'static', text: 'Static' },
  { key: 'regex', text: 'Regex' },
  { key: 'expression', text: 'Expression' },
];

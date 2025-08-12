import type { ICondition } from '../../types';

export interface IConditionListProps {
  conditions: ICondition[];
  onDelete: (idx: number) => void;
}

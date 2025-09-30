import type { Node } from '@xyflow/react';

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';
export type EdgeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';

export type ConditionType = 'static' | 'regex' | 'expression';

export interface ICondition {
  id: string;
  label: string;

  type: 'primary' | 'fallback';
  conditionType: ConditionType;
  dataAccessKey?: string;
  pattern?: string;
  expression?: string;
}

type unknownRecord = { [key: string]: unknown };
export interface IBaseNodeData extends unknownRecord {
  label?: string;
  description?: string;
  status?: NodeStatus;
  edgeStatus?: EdgeStatus;
}

export interface ITaskNodeData extends IBaseNodeData {
  taskName?: string;
  taskType?: 'http' | 'db' | 'script';
  inputSource?: string;
}

export interface ISwitchNodeData extends IBaseNodeData {
  cases?: string[];
}

export interface IMergeNodeData extends IBaseNodeData {
  inputs?: string[];
}

export interface IDecisionNodeData extends IBaseNodeData {
  condition?: ICondition[];
}

export type NodeType =
  | 'object'
  | 'task'
  | 'start'
  | 'end'
  | 'input'
  | 'switch'
  | 'merge'
  | 'decision';

export type TaskNodeType = Node<ITaskNodeData, 'task'>;
export type StartNodeType = Node<IBaseNodeData, 'start'>;
export type EndNodeType = Node<IBaseNodeData, 'end'>;
export type InputNodeType = Node<IBaseNodeData, 'input'>;
export type ObjectNodeType = Node<IBaseNodeData, 'object'>;
export type SwitchNodeType = Node<ISwitchNodeData, 'switch'>;
export type MergeNodeType = Node<IMergeNodeData, 'merge'>;
export type DecisionNodeType = Node<IDecisionNodeData, 'decision'>;

export type CustomNode =
  | TaskNodeType
  | StartNodeType
  | EndNodeType
  | InputNodeType
  | ObjectNodeType
  | SwitchNodeType
  | MergeNodeType
  | DecisionNodeType;

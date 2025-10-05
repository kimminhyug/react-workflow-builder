import type { Node } from '@xyflow/react';

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';
export type EdgeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';
export type ConditionType = 'static' | 'regex' | 'expression';

/**
 * 시뮬레이션 실행 중 노드 간 데이터를 공유하기 위한 컨텍스트
 */
export interface IFlowContext {
  /** 각 노드 ID별 실행 결과 저장 */
  nodeResults: Record<string, unknown>;
  /** 전역 데이터 (input 값, 변환된 object 등) */
  globals: Record<string, unknown>;
  /** 현재 실행중인 노드에 전달할 데이터 */
  current?: Record<string, unknown>;
}

export interface ICondition {
  id: string;
  label: string;
  type: 'primary' | 'fallback';
  fallbackTarget?: string;
  conditionType: ConditionType;
  dataAccessKey?: string;
  pattern?: string;
  expression?: string;
}

type unknownRecord = { [key: string]: unknown };
/**  시뮬레이션 실행시 호출하는 사용자 정의 함수 */
type nodeExecute = (context: IFlowContext) => Promise<void> | void;
export interface IBaseNodeData extends unknownRecord {
  label?: string;
  description?: string;
  status?: NodeStatus;
  edgeStatus?: EdgeStatus;
  execute?: nodeExecute;
  fallbackTarget?: string;
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

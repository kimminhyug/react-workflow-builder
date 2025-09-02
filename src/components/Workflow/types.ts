import type { Node } from '@xyflow/react';

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';
export type ConditionType = 'static' | 'regex' | 'expression';

export interface ICondition {
  label: string;
  type: 'primary' | 'fallback';
  conditionType: ConditionType;
  dataAccessKey?: string;
  // 정규식
  pattern?: string;
  // 함수용인데 음 사전등록제로 해야하나
  expression?: string;
}

export interface INodeData {
  label?: string;
  taskName?: string;
  inputSource?: string;
  taskType?: 'http' | 'db' | 'script';
  description?: string;
  status?: NodeStatus;
  fallback?: string[];
  // 정규식
  expression?: string;
  // 시물레이션 분기용
  condition?: ICondition[];
}
type unknownRecord = { [key: string]: unknown };
export type NodeType = 'object' | 'task' | 'start' | 'end';

export type CustomNode = Node<INodeData & unknownRecord, NodeType>;

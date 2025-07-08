import type { Node } from '@xyflow/react';

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';

interface INodeData {
  label?: string;
  taskName?: string;
  expression?: string;
  status?: NodeStatus;
}
type unknownRecord = { [key: string]: unknown };
export type NodeType = 'input' | 'task' | 'condition' | 'start' | 'end';
export type CustomNode = Node<INodeData & unknownRecord, NodeType>;

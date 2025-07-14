import type { Node } from '@xyflow/react';

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done';

interface INodeData {
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
  condition?: string;
}
type unknownRecord = { [key: string]: unknown };
export type NodeType = 'input' | 'task' | 'start' | 'end';

export type CustomNode = Node<INodeData & unknownRecord, NodeType>;

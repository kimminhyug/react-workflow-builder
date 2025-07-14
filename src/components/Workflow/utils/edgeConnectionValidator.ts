import type { NodeType } from '../types';

export const allowedConnections: Record<NodeType, NodeType[]> = {
  start: ['input'],
  input: ['task'],
  task: ['task', 'end'],
  end: [],
};

// <-> 엣지 연결 가능한지 확인
export const canConnect = (sourceType: NodeType, targetType: NodeType): boolean => {
  return allowedConnections[sourceType]?.includes(targetType) ?? false;
};

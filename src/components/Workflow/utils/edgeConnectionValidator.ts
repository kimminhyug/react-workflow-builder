import type { NodeType } from '../types';

//inout 고려필요
//  start: { out: ['task', 'decision', 'merge', 'switch'], in: [] },
export const allowedConnections: Record<NodeType, NodeType[]> = {
  start: ['input', 'task', 'end', 'decision', 'merge', 'switch'],
  input: ['task', 'start', 'end', 'decision', 'merge', 'switch'],
  task: ['input', 'start', 'end', 'decision', 'merge', 'switch'],
  end: [],
  object: [],
  switch: ['start', 'input', 'task', 'end', 'decision', 'merge'],
  merge: ['start', 'input', 'task', 'end', 'decision', 'switch'],
  decision: ['start', 'input', 'task', 'end', 'merge', 'switch'],
};

// <-> 엣지 연결 가능한지 확인
export const canConnect = (sourceType: NodeType, targetType: NodeType): boolean => {
  return allowedConnections[sourceType]?.includes(targetType) ?? false;
};

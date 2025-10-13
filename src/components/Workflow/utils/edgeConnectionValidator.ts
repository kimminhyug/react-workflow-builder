import type { NodeType } from '../types';
import { excludeFromArray } from './workflowIdUtils';

const fullConnections: NodeType[] = [
  'start',
  'input',
  'task',
  'end',
  'merge',
  'switch',
  'decision',
  'delay',
  'object',
  'input',
];

export const allowedConnections: Record<NodeType, NodeType[]> = {
  start: excludeFromArray(fullConnections, ['start']),
  input: excludeFromArray(fullConnections, ['input']),
  task: excludeFromArray(fullConnections, ['task']),
  end: excludeFromArray(fullConnections, ['end']),
  object: excludeFromArray(fullConnections, ['object']),
  switch: excludeFromArray(fullConnections, ['switch']),
  merge: excludeFromArray(fullConnections, ['merge']),
  decision: excludeFromArray(fullConnections, ['decision']),
  delay: excludeFromArray(fullConnections, ['delay']),
};

// <-> 엣지 연결 가능한지 확인
export const canConnect = (sourceType: NodeType, targetType: NodeType): boolean => {
  return allowedConnections[sourceType]?.includes(targetType) ?? false;
};

import type { Node } from '@xyflow/react';

interface INodeData {
  label?: string;
  taskName?: string;
  expression?: string;
}
type unknownRecord = { [key: string]: unknown };
export type NodeType = 'input' | 'task' | 'condition' | 'start' | 'end';
export type CustomNode = Node<INodeData & unknownRecord, NodeType>;

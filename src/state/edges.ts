import { atom } from 'jotai';
import type { Edge } from '@xyflow/react';

interface IEdgeData {
  label?: string;
  taskName?: string;
  expression?: string;
}
type unknownRecord = { [key: string]: unknown };
export type EdgeType = 'default';
export type CustomEdge = Edge<IEdgeData & unknownRecord, EdgeType>;

export const edgesAtom = atom<CustomEdge[]>([]);

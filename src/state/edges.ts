import { atom } from 'jotai';
import type { Edge } from '@xyflow/react';
type unknownRecord = { [key: string]: unknown };
export interface IEdgeData extends unknownRecord {
  label: string;
  taskName?: string;
  expression?: string;
}

export type EdgeType = 'default';
export type CustomEdge = Edge<IEdgeData, EdgeType>;

export const edgesAtom = atom<CustomEdge[]>([]);

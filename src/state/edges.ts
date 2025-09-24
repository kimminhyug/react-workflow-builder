import type { Edge } from '@xyflow/react';
import { atom } from 'jotai';
type unknownRecord = { [key: string]: unknown };
export interface IEdgeData extends unknownRecord {
  label: string;
  taskName?: string;
  expression?: string;
}

export type EdgeType = 'default';
export type CustomEdge = Edge<IEdgeData, EdgeType>;

export const edgesAtom = atom<CustomEdge[]>([
  {
    source: 'start-1-6adb6a',
    sourceHandle: 'start-1-6adb6a-out',
    target: 'task-1-4b6daa',
    targetHandle: 'task-1-4b6daa-in',
    id: 'start-1-6adb6a__start-1-6adb6a-out__task-1-4b6daa__task-1-4b6daa-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: '서버 1 상태 체크' },
  },
  {
    source: 'start-1-6adb6a',
    sourceHandle: 'start-1-6adb6a-out',
    target: 'task-1-ae63c7',
    targetHandle: 'task-1-ae63c7-in',
    id: 'start-1-6adb6a__start-1-6adb6a-out__task-1-ae63c7__task-1-ae63c7-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: '예비 서버' },
  },
  {
    source: 'task-1-4b6daa',
    sourceHandle: 'task-1-4b6daa-out',
    target: 'task-1-89e470',
    targetHandle: 'task-1-89e470-in',
    id: 'task-1-4b6daa__task-1-4b6daa-out__task-1-89e470__task-1-89e470-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: '1서버 조회 완료' },
  },
  {
    source: 'task-1-ae63c7',
    sourceHandle: 'task-1-ae63c7-out',
    target: 'task-1-89e470',
    targetHandle: 'task-1-89e470-in',
    id: 'task-1-ae63c7__task-1-ae63c7-out__task-1-89e470__task-1-89e470-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: '1-2서버 조회 완료' },
  },
  {
    source: 'task-1-89e470',
    sourceHandle: 'task-1-89e470-out',
    target: 'task-1-dfa760',
    targetHandle: 'task-1-dfa760-in',
    id: 'task-1-89e470__task-1-89e470-out__task-1-dfa760__task-1-dfa760-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: '데이터 조회 시간: 00:00:00' },
  },
  {
    source: 'task-1-dfa760',
    sourceHandle: 'task-1-dfa760-out',
    target: 'task-1-53b8c1',
    targetHandle: 'task-1-53b8c1-in',
    id: 'task-1-dfa760__task-1-dfa760-out__task-1-53b8c1__task-1-53b8c1-in',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    labelStyle: { fill: '#555', fontWeight: 'bold' },
    selected: false,
    data: { label: 'commit;' },
  },
]);

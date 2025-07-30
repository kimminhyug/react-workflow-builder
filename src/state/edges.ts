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

export const edgesAtom = atom<CustomEdge[]>([
  {
    source: '1',
    sourceHandle: 'bottom',
    target: '88d2a946-90a4-4eed-b103-a3c000164844',
    targetHandle: 'top',
    id: 'd18a0150-e373-4c8c-9df2-b2e45dd2532e',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: '서버 1 상태 체크',
    },
  },
  {
    source: '1',
    sourceHandle: 'bottom',
    target: '48c4d0c5-b3ff-4e75-94df-1fa1ef517639',
    targetHandle: 'top',
    id: '8baa0a53-31f9-4388-a4c1-a24a5b653765',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: '예비 서버',
    },
  },
  {
    source: '88d2a946-90a4-4eed-b103-a3c000164844',
    sourceHandle: 'bottom',
    target: '440a366a-aadf-46f1-916d-6eaa8f46c9bc',
    targetHandle: 'top',
    id: '1a42c4b0-d813-448e-8c59-89ee5cc140ca',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: '1서버 조회 완료',
    },
  },
  {
    source: '48c4d0c5-b3ff-4e75-94df-1fa1ef517639',
    sourceHandle: 'bottom',
    target: '440a366a-aadf-46f1-916d-6eaa8f46c9bc',
    targetHandle: 'top',
    id: '238d0f05-454d-47a8-9850-073a3558dc33',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: '1-2서버 조회 완료',
    },
  },
  {
    source: '4f0d131c-9c9b-4707-8a0c-e505d10f90ff',
    sourceHandle: 'bottom',
    target: '2',
    targetHandle: 'top',
    id: '045939d1-1dc1-4625-9959-b9eb0addb995',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: 'commit;',
    },
  },
  {
    source: '440a366a-aadf-46f1-916d-6eaa8f46c9bc',
    sourceHandle: 'bottom',
    target: '4f0d131c-9c9b-4707-8a0c-e505d10f90ff',
    targetHandle: 'top',
    id: '67d8357a-b50b-4218-96d0-37cf3c0e3720',
    type: 'default',
    label: '기본 엣지',
    animated: true,
    style: {
      stroke: '#888',
      strokeWidth: 2,
    },
    labelStyle: {
      fill: '#555',
      fontWeight: 'bold',
    },
    selected: false,
    data: {
      label: '데이터 조회 시간: 00:00:00',
    },
  },
]);

import { atom } from 'jotai';
import type { CustomNode } from '../components/Workflow/types';

export const nodesAtom = atom<CustomNode[]>([
  {
    id: '1',
    type: 'start',
    position: { x: 100, y: 100 },
    data: { label: 'Start' },
  },
  {
    id: '2',
    type: 'task',
    position: { x: 200, y: 200 },
    data: { label: '새로운 작업', taskName: '서비스 불러오기' },
  },
]);

export const activeNodeIdAtom = atom<string | null>(null);

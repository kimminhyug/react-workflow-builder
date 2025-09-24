import { atom } from 'jotai';
import type { CustomNode } from '../components/Workflow/types';

export const nodesAtom = atom<CustomNode[]>([
  {
    id: 'start-1-6adb6a',
    type: 'start',
    position: { x: 240.49, y: -52.07 },
    data: {
      label: 'Start',
      conditionList: [
        { label: '서버 1 상태 체크', type: 'primary', conditionType: 'static' },
        { label: '1_fallback', type: 'fallback', conditionType: 'static' },
        { label: '예비 서버', type: 'fallback', conditionType: 'static' },
      ],
      status: 'startWaiting',
    },
    measured: { width: 104, height: 46 },
    selected: false,
    dragging: false,
  },
  {
    id: 'task-1-4b6daa',
    type: 'task',
    position: { x: 205.83, y: 95.51 },
    data: {
      label: '서버 1',
      status: 'startWaiting',
      conditionList: [{ label: '1서버 조회 완료', type: 'primary', conditionType: 'static' }],
    },
    measured: { width: 97, height: 46 },
    selected: false,
    dragging: false,
  },
  {
    id: 'task-1-ae63c7',
    type: 'task',
    position: { x: -55.49, y: 95.28 },
    data: {
      label: '서버 1-2',
      status: 'startWaiting',
      conditionList: [{ label: '1-2서버 조회 완료', type: 'primary', conditionType: 'static' }],
    },
    measured: { width: 116, height: 46 },
    selected: false,
    dragging: false,
  },
  {
    id: 'task-1-89e470',
    type: 'task',
    position: { x: 110.42, y: 252.83 },
    data: {
      label: '데이터 조회',
      taskName: '',
      status: 'startWaiting',
      conditionList: [
        {
          label: '데이터 조회 시간: 00:00:00',
          type: 'primary',
          conditionType: 'regex',
          path: 'data.timestamp',
          pattern: '^00:00:00$',
        },
      ],
    },
    measured: { width: 138, height: 46 },
    selected: false,
    dragging: false,
  },
  {
    id: 'task-1-dfa760',
    type: 'task',
    position: { x: 97.56, y: 372.77 },
    data: {
      label: '데이터 업데이트',
      taskName: '',
      status: 'startWaiting',
      conditionList: [
        {
          label: 'commit;',
          type: 'primary',
          conditionType: 'expression',
          expression: 'response.lastCommit === true',
        },
      ],
    },
    measured: { width: 172, height: 46 },
    selected: true,
    dragging: false,
  },
  {
    id: 'task-1-53b8c1',
    type: 'task',
    position: { x: 123.93, y: 500.52 },
    data: {
      label: '세션 종료',
      taskName: '서비스 불러오기',
      status: 'startWaiting',
    },
    measured: { width: 121, height: 46 },
    selected: false,
    dragging: false,
  },
]);

export const activeNodeIdAtom = atom<string | null>(null);

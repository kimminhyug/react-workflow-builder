import { atom } from 'jotai';
import type { CustomNode } from '../components/Workflow/types';

export const nodesAtom = atom<CustomNode[]>([
  {
    id: '1',
    type: 'start',
    position: { x: 240.4976809318585, y: -52.07554466537131 },
    data: {
      label: 'Start',
      conditionList: [
        { label: '서버 1 상태 체크', type: 'primary', conditionType: 'static' },
        { label: '1_fallback', type: 'fallback', conditionType: 'static' },
        { label: '예비 서버', type: 'fallback', conditionType: 'static' },
      ],
      status: 'done',
    },
    measured: { width: 72, height: 48 },
    selected: false,
    dragging: false,
  },
  {
    id: '2',
    type: 'task',
    position: { x: 123.93238697477824, y: 500.5231907913284 },
    data: {
      label: '세션 종료',
      taskName: '서비스 불러오기',
      status: 'done',
    },
    measured: { width: 102, height: 48 },
    selected: false,
    dragging: false,
  },
  {
    id: '440a366a-aadf-46f1-916d-6eaa8f46c9bc',
    type: 'task',
    position: { x: 110.42781038653683, y: 252.8364411158072 },
    data: {
      label: '데이터 조회',
      taskName: '',
      status: 'done',
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
    measured: { width: 119, height: 48 },
    selected: false,
    dragging: false,
  },
  {
    id: '4f0d131c-9c9b-4707-8a0c-e505d10f90ff',
    type: 'task',
    position: { x: 97.56333376317119, y: 372.77575658723083 },
    data: {
      label: '데이터 업데이트',
      taskName: '',
      status: 'done',
      conditionList: [
        {
          label: 'commit;',
          type: 'primary',
          conditionType: 'expression',
          expression: 'response.lastCommit === true',
        },
      ],
    },
    measured: { width: 153, height: 48 },
    selected: true,
    dragging: false,
  },
  {
    id: '48c4d0c5-b3ff-4e75-94df-1fa1ef517639',
    type: 'input',
    style: { background: '#ececec' },
    position: { x: -55.496083228744084, y: 95.28410021876725 },
    data: {
      label: '서버 1-2',
      status: 'waiting',
      conditionList: [
        {
          label: '1-2서버 조회 완료',
          type: 'primary',
          conditionType: 'static',
        },
      ],
    },
    measured: { width: 150, height: 64 },
    selected: false,
    dragging: false,
  },
  {
    id: '88d2a946-90a4-4eed-b103-a3c000164844',
    type: 'input',
    style: { background: '#ececec' },
    position: { x: 205.83800288866183, y: 95.51715507342183 },
    data: {
      label: '서버 1',
      status: 'done',
      conditionList: [
        {
          label: '1서버 조회 완료',
          type: 'primary',
          conditionType: 'static',
        },
      ],
    },
    measured: { width: 150, height: 64 },
    selected: false,
    dragging: false,
  },
]);

export const activeNodeIdAtom = atom<string | null>(null);

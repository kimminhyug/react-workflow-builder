import type { IEdgeData } from '../../../state/edges';
import type { CustomNode, NodeType } from '../types';

export const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#888', strokeWidth: 2 },
  labelStyle: { fill: '#555', fontWeight: 'bold' },
};

/**
 * 시물레이션 진행하면서 엣지상태에 따라 색상업데이트
 * @param data edge data
 * @returns stroke-color
 */
export const getEdgeColor = (data?: IEdgeData): string => {
  if (!data) return '#aaa';

  // edge에 직접 status를 넣었다면
  const status = data.status ?? 'waiting';

  switch (status) {
    case 'running':
      return '#facc15'; // 진행 중: 노란색
    case 'done':
      '';
      return '#3fb950'; // 완료: 초록색
    case 'waiting':
    case 'startWaiting':
      return '#aaa'; // 대기: 회색
    default:
      return '#aaa';
  }
};

export const nodeInitializeProperties: CustomNode['data'] = {
  taskName: '',
  status: 'startWaiting',
};

export const nodeIconMap: Record<NodeType, string> = {
  task: 'ProcessMetaTask',
  start: 'Play',
  end: 'Stop',
  decision: 'BranchFork',
  merge: 'MergeDuplicate',
  switch: 'DOM',
  delay: 'Clock',
  object: '',
  input: '',
};

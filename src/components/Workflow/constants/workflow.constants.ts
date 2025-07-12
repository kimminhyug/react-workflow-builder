import type { IEdgeData } from '../../../state/edges';
import type { CustomNode } from '../types';

export const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#888', strokeWidth: 2 },
  labelStyle: { fill: '#555', fontWeight: 'bold' },
};

/**
 * 시물레이션 진행하면서 엣지상태에 따라 색상업데이트
 * @param data edge data
 * @param sourceNode 이미 시물레이션 완료된 엣지?
 * @returns stroke-color
 */
export const getEdgeColor = (data?: IEdgeData, sourceNode?: CustomNode): string => {
  if (!data || !sourceNode) return 'auto';

  const condition = sourceNode.data?.condition?.toLowerCase();
  const fallback = (sourceNode.data?.fallback || []).map((f) => f.toLowerCase());
  const label = data?.label?.toLowerCase();

  // 라벨 입력필요 상황
  if (!label) return '#aaa';
  // 조건 성공
  if (label === condition) return '#3fb950';
  //  폴백타면
  if (fallback.includes(label)) return '#facc15';
  // 예상치못한경우
  return '#aaa';
};

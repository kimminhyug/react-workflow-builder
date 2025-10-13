import { atom } from 'jotai';
import { v4 as uuid } from 'uuid';

/**
 * 노드 카운터 atom
 * - 모든 노드 생성 시 순차적 번호를 관리
 */
export const nodeCounterAtom = atom(0);

/**
 * 노드 ID 생성
 * - format: `${type}-${count}-${uuid}`
 * - 예: task-1-4f2a8c
 * @param type 노드 타입 (예: 'task', 'start')
 * @param get atom get 함수
 * @param set atom set 함수
 * @returns 유니크한 노드 ID
 */
export const createNodeId = (
  type: string,
  get: (atom: typeof nodeCounterAtom) => number,
  set: (atom: typeof nodeCounterAtom, val: number) => void
) => {
  const count = get(nodeCounterAtom) + 1;
  set(nodeCounterAtom, count);
  return `${type}-${count}-${uuid().slice(0, 6)}`;
};

/**
 * 핸들 ID 생성
 * - 노드 ID + 핸들 이름으로 유니크
 * @param nodeId 생성된 노드 ID
 * @param handleName 핸들 이름 (예: 'in', 'out')
 * @returns 유니크한 핸들 ID
 */
export const createHandleId = (nodeId: string, handleName: string) => `${nodeId}-${handleName}`;

/**
 * 엣지 ID 생성
 * - source/target 노드 및 핸들 ID 기반
 * @param sourceNodeId 출발 노드 ID
 * @param sourceHandleId 출발 핸들 ID
 * @param targetNodeId 도착 노드 ID
 * @param targetHandleId 도착 핸들 ID
 * @returns 유니크한 엣지 ID
 */
export const createEdgeId = (
  sourceNodeId: string,
  sourceHandleId: string,
  targetNodeId: string,
  targetHandleId: string
) => `${sourceNodeId}__${sourceHandleId}__${targetNodeId}__${targetHandleId}`;

/**
 * 전체 배열에서 특정 배열 데이터를 제외하여 반환(불변성 유지)
 * @property {T[]} [all] - 전체 배열
 * @property {T[]} [excludes] - 제외할 배열
 */
export const excludeFromArray = <T>(all: T[], excludes: T[]): T[] => {
  const excludeSet = new Set(excludes);
  const result = all.filter((item) => !excludeSet.has(item));
  return result;
};

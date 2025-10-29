import type { Node } from '@xyflow/react';
import type { CustomEdge } from '../../state/edges';
export interface IBuilderProps {
  workflow?: IWorkflow;
}

export interface IWorkflow {
  id: string;
  name?: string;
  description?: string;
  regData: number;
  modDate: number;
  nodes: CustomNode[];
  edges: CustomEdge[];
}

// 시작준비중 | 대기중 | 실행중 | 완료
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done' | 'failed';
export type EdgeStatus = 'startWaiting' | 'waiting' | 'running' | 'done' | 'failed';

export type ConditionType = 'static' | 'regex' | 'expression';

/**
 * 시뮬레이션 실행 중 노드 간 데이터를 공유하기 위한 컨텍스트
 */
export interface IFlowContext {
  /** 각 노드 ID별 실행 결과 저장 */
  nodeResults: Record<string, any>;
  /** 전역 데이터 (input 값, 변환된 object 등) */
  globals: Record<string, unknown>;
  /** 현재 실행중인 노드에 전달할 데이터 */
  current?: Record<string, unknown>;
  /** 엣지 상태 */
  edgeStatusMap: Record<string, EdgeStatus>;
}

export interface ICondition {
  id: string;
  label: string;
  conditionType: ConditionType; // 'static' | 'regex' | 'expression'
  priority?: number;
  dataAccessKey?: string;
  pattern?: string;
  expression?: string;
  staticValue?: string;
  targetNodeId?: string;
}

type unknownRecord = { [key: string]: unknown };
/**  시뮬레이션 실행시 호출하는 사용자 정의 함수 */

export type NodeExecute = (context: IFlowContext, node: CustomNode) => Promise<void> | void;
export interface IBaseNodeData extends unknownRecord {
  label?: string;
  description?: string;
  status?: NodeStatus;
  edgeStatus?: EdgeStatus;
  execute?: NodeExecute;
  context?: IFlowContext;
}
/**
 * **TaskNode (task)**
 *
 * 실제 작업을 수행하는 노드입니다.
 * HTTP 요청, DB 쿼리, 스크립트 실행 등의 결과를 `context.nodeResults`에 저장합니다.
 *
 * ---
 * **역할**
 * - 워크플로우 내에서 실제 실행 로직을 담당
 *
 * **주요 기능**
 * - HTTP 요청, DB 쿼리, 스크립트 실행 수행
 * - 결과를 context에 저장하여 후속 노드가 참조 가능
 *
 * ---
 * **데이터**
 * @property {string} [taskName] - 작업 이름
 * @property {'http' | 'db' | 'script'} [taskType] - 작업 유형
 * @property {string} [inputSource] - 입력 값의 출처 (예: context 키, 외부 참조 등)
 *
 * ---
 * **특징**
 * - 결과 여부와 관계없이 기본적으로 다음 노드로 흐름이 전달됨
 */
export interface ITaskNodeData extends IBaseNodeData {
  taskName?: string;
  taskType?: 'http' | 'db' | 'script';
  inputSource?: string;
}

/**
 * **MergeNode**
 *
 * 여러 흐름을 하나로 합치는 노드입니다.
 * 모든 입력 Edge가 완료될 때까지 대기 후 다음 노드를 실행합니다.
 *
 * ---
 * **역할**
 * - 병렬로 실행된 여러 노드의 결과를 집약
 *
 * **주요 기능**
 * - 모든 입력이 완료될 때까지 대기
 * - 입력 중 하나라도 실패하면 전체 실패 처리 가능
 *
 * ---
 * **데이터**
 * @property {string[]} [inputs] - 합칠 노드 ID 배열
 */
export interface IMergeNodeData extends IBaseNodeData {
  inputs?: string[];
}

/**
 * **DecisionNode**
 *
 * 조건 기반의 분기 로직을 수행하는 노드입니다.
 * 여러 조건(`condition`)을 평가하여 참인 조건의 Edge로 흐름을 전달합니다.
 *
 * ---
 * **역할**
 * - 복수 조건 평가 및 결과에 따른 흐름 결정
 *
 * **주요 기능**
 * - 각 `condition`의 expression, regex, static 값 평가
 * - 참인 조건이 없을 경우 `fallbackTarget`으로 이동
 * - `execute` 함수를 통해 조건 평가 전 추가 작업 수행 가능
 *
 * ---
 * **데이터**
 * @property {ICondition[]} [condition] - 조건 목록 (expression, regex, static 등)
 * @property {string} [fallbackTarget] - 모든 조건 실패 시 이동할 노드 ID
 */
export interface IDecisionNodeData extends IBaseNodeData {
  condition?: ICondition[];
  fallbackTarget?: string;
}

export type NodeType =
  | 'object'
  | 'task'
  | 'start'
  | 'end'
  | 'input'
  | 'merge'
  | 'delay'
  | 'decision';

export type TaskNodeType = Node<ITaskNodeData, 'task'>;
export type StartNodeType = Node<IBaseNodeData, 'start'>;
export type EndNodeType = Node<IBaseNodeData, 'end'>;
export type InputNodeType = Node<IBaseNodeData, 'input'>;
export type ObjectNodeType = Node<IBaseNodeData, 'object'>;

export type MergeNodeType = Node<IMergeNodeData, 'merge'>;
export type DecisionNodeType = Node<IDecisionNodeData, 'decision'>;
export type NodeDataType = ITaskNodeData | IBaseNodeData | IMergeNodeData | IDecisionNodeData;

export type CustomNode =
  | TaskNodeType
  | StartNodeType
  | EndNodeType
  | InputNodeType
  | ObjectNodeType
  | MergeNodeType
  | DecisionNodeType;

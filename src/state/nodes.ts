// nodesAtom.ts
import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import type {
  ConditionType,
  CustomNode,
  DecisionNodeType,
  EndNodeType,
  IBaseNodeData,
  ICondition,
  IDecisionNodeData,
  InputNodeType,
  ITaskNodeData,
  MergeNodeType,
  NodeStatus,
  ObjectNodeType,
  StartNodeType,
  SwitchNodeType,
  TaskNodeType,
} from '../components/Workflow/types';

/** 기본값 상수 */
export const DEFAULT_MEASURED = { width: 100, height: 46 };
export const DEFAULT_STATUS: NodeStatus = 'startWaiting';
export const DEFAULT_TASK_TYPE: 'http' | 'db' | 'script' = 'http';

/**
 * ICondition 생성 헬퍼
 * - id: UUID 자동 생성
 */
export const createCondition = (
  label: string,

  conditionType: ConditionType,
  options?: Omit<Partial<ICondition>, 'id'>
): ICondition => {
  return {
    //내부용 id
    id: uuidv4(),
    label,

    conditionType,
    //기타
    ...options,
  };
};

/** Start Node 헬퍼 */
export const createStartNode = (options: {
  id: string;
  position: { x: number; y: number };
  data?: Partial<IBaseNodeData>;
}): StartNodeType => {
  const { id, position, data = {} } = options;

  const nodeData: IBaseNodeData = {
    label: data.label || '',
    status: data.status || DEFAULT_STATUS,
    condition: data.condition || [],
    description: data.description || '',
  };

  return {
    id,
    type: 'start',
    position,
    data: nodeData,
    measured: DEFAULT_MEASURED,
    selected: false,
    dragging: false,
  };
};

/** Task Node 헬퍼 */
export const createTaskNode = (options: {
  id: string;
  position: { x: number; y: number };
  data?: Partial<ITaskNodeData>;
}): TaskNodeType => {
  const { id, position, data = {} } = options;

  const nodeData: ITaskNodeData = {
    label: data.label || '',
    status: data.status || DEFAULT_STATUS,
    taskName: data.taskName || '',
    taskType: data.taskType || DEFAULT_TASK_TYPE,
    execute: data.execute,
    condition: data.condition || [],
    fallback: data.fallback || [],
    cases: data.cases || [],
    inputs: data.inputs || [],
    description: data.description || '',
    expression: data.expression,
    inputSource: data.inputSource,
  };

  return {
    id,
    type: 'task',
    position,
    data: nodeData,
    measured: DEFAULT_MEASURED,
    selected: false,
    dragging: false,
  };
};

export const createDecisionNode = (options: {
  id: string;
  position: { x: number; y: number };
  data?: Partial<IDecisionNodeData>;
}): DecisionNodeType => {
  const { id, position } = options;

  return {
    id,
    type: 'decision',
    position,
    data: {
      condition: [
        {
          id: 'c1',
          label: 'adult',
          conditionType: 'expression',
          expression: 'context.nodeResults["task-1"].age >= 18',
        },
      ],
    },
    measured: DEFAULT_MEASURED,
    selected: false,
    dragging: false,
  };
};

/** nodesAtom 초기값 */
export const nodesAtom = atom<CustomNode[]>([
  createStartNode({
    id: 'start-1-6adb6a',
    position: { x: 240, y: -50 },
    data: {
      label: 'Start',
      condition: [
        createCondition('서버 1 상태 체크', 'static'),
        createCondition('1_fallback', 'static'),
        createCondition('예비 서버', 'static'),
      ],
    },
  }),

  createTaskNode({
    id: 'task-1-4b6daa',
    position: { x: 205, y: 95 },
    // data: {
    //   label: '서버 1',
    //   condition: [createCondition('1서버 조회 완료',  'static')],
    // },
    data: {
      label: 'API 호출',
      taskName: 'Fetch User',
      execute: async (context) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');

        const data = await res.json();
        context.nodeResults['task-1'] = data;
        context.globals['user'] = data;
      },
    },
  }),

  createTaskNode({
    id: 'task-1-ae63c7',
    position: { x: -55, y: 95 },
    data: {
      label: '서버 1-2',
      condition: [createCondition('1-2서버 조회 완료', 'static')],
    },
  }),

  createDecisionNode({
    id: 'task-1-89e470',
    position: { x: 110, y: 252 },
    data: {
      label: '데이터 조회',
      taskType: 'db',
      condition: [
        createCondition('데이터 조회 시간: 00:00:00', 'regex', {
          dataAccessKey: 'data.timestamp',
          pattern: '^00:00:00$',
        }),
      ],
    },
  }),

  createTaskNode({
    id: 'task-1-dfa760',
    position: { x: 97, y: 372 },
    data: {
      label: '데이터 업데이트',
      taskType: 'script',
      condition: [
        createCondition('commit;', 'expression', {
          expression: 'response.lastCommit === true',
        }),
      ],
    },
  }),

  createTaskNode({
    id: 'task-1-53b8c1',
    position: { x: 123, y: 500 },
    data: {
      label: '세션 종료',
      taskName: '서비스 불러오기',
    },
  }),
]);

/** 현재 선택된 Node ID */
export const activeNodeIdAtom = atom<string | null>(null);

/** Task Node 업데이트 */
export const updateTaskNode = (
  node: TaskNodeType,
  data: Partial<TaskNodeType['data']>
): TaskNodeType => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Start Node 업데이트 */
export const updateStartNode = (
  node: StartNodeType,
  data: Partial<StartNodeType['data']>
): StartNodeType => {
  return { ...node, data: { ...node.data, ...data } };
};

/** End Node 업데이트 */
export const updateEndNode = (
  node: EndNodeType,
  data: Partial<EndNodeType['data']>
): EndNodeType => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Input Node 업데이트 */
export const updateInputNodeType = (
  node: InputNodeType,
  data: Partial<InputNodeType['data']>
): InputNodeType => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Object Node 업데이트 */
export const updateObjectNodeType = (
  node: ObjectNodeType,
  data: Partial<ObjectNodeType['data']>
): ObjectNodeType => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Switch Node 업데이트 */
export const updateSwitchNode = (node: SwitchNodeType, data: Partial<SwitchNodeType['data']>) => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Merge Node 업데이트 */
export const updateMergeNode = (node: MergeNodeType, data: Partial<MergeNodeType['data']>) => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Decision Node 업데이트 */
export const updateDecisionNode = (
  node: DecisionNodeType,
  data: Partial<DecisionNodeType['data']>
) => {
  return { ...node, data: { ...node.data, ...data } };
};

/** Node 타입 체크 하고, ts가 Node 타입 인식 할수 있도록 체크 함수 생성*/
export const isTaskNode = (node: CustomNode): node is TaskNodeType => {
  return node.type === 'task';
};
/** 시작 Node */
export const isStartNode = (node: CustomNode): node is StartNodeType => {
  return node.type === 'start';
};
/** 종료 Node */
export const isEndNode = (node: CustomNode): node is EndNodeType => {
  return node.type === 'end';
};
/** Input Node */
export const isInputNodeType = (node: CustomNode): node is InputNodeType => {
  return node.type === 'input';
};
/** 오브젝트 Node? 커스텀 Node인데 일단 보류 */
export const isObjectNodeType = (node: CustomNode): node is ObjectNodeType => {
  return node.type === 'object';
};
/** Switch Node */
export const isSwitchNode = (node: CustomNode): node is SwitchNodeType => {
  return node.type === 'switch';
};
/** Merge Node */
export const isMergeNode = (node: CustomNode): node is MergeNodeType => {
  return node.type === 'merge';
};
/** Decision Node  */
export const isDecisionNode = (node: CustomNode): node is DecisionNodeType => {
  return node.type === 'decision';
};

/** 모든 Node 공통 업데이트 함수 */
export const applyNodeUpdate = (node: CustomNode, updatedNode: CustomNode): CustomNode => {
  if (isTaskNode(node) && isTaskNode(updatedNode)) {
    return updateTaskNode(node, updatedNode.data);
  }
  if (isStartNode(node) && isStartNode(updatedNode)) {
    return updateStartNode(node, updatedNode.data);
  }
  if (node.type === 'end' && updatedNode.type === 'end') {
    return updateEndNode(node, updatedNode.data);
  }
  if (node.type === 'input' && updatedNode.type === 'input') {
    return updateInputNodeType(node, updatedNode.data);
  }
  if (node.type === 'object' && updatedNode.type === 'object') {
    return updateObjectNodeType(node, updatedNode.data);
  }
  if (node.type === 'switch' && updatedNode.type === 'switch') {
    return updateSwitchNode(node, updatedNode.data);
  }
  if (node.type === 'merge' && updatedNode.type === 'merge') {
    return updateMergeNode(node, updatedNode.data);
  }
  if (node.type === 'decision' && updatedNode.type === 'decision') {
    return updateDecisionNode(node, updatedNode.data);
  }
  return node;
};

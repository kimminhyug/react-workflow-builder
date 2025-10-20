import { v4 as uuid } from 'uuid';
import type { CustomEdge, IEdgeData } from '../../../state/edges';
import type { CustomNode, IWorkflow, NodeType } from '../types';

export const dummyWorkflow: IWorkflow = {
  id: 'f1ae7e07-17dd-4afc-8ce6-4d03f59dd1a4',
  name: '',
  description: '',
  regData: 1760702561690,
  modDate: 1760702561690,
  nodes: [
    {
      id: 'bbc9a700-ff82-4a0f-a029-5cfa3cd191d9',
      type: 'start',
      position: {
        x: 259.5760561962574,
        y: 8.204581044501488,
      },
      data: {
        taskName: '',
        status: 'waiting',
        label: '시작',
      },
      measured: {
        width: 80,
        height: 44,
      },
      selected: false,
    },
    {
      id: '1e4f76f2-decf-4f6b-b087-657af0fa9336',
      type: 'task',
      position: {
        x: 236.9417415505581,
        y: 119.41741550558137,
      },
      data: {
        taskName: '작업 1',
        status: 'waiting',
        label: 'API 호출',
        taskType: 'http',
        inputSource: '',
      },
      measured: {
        width: 118,
        height: 44,
      },
    },
    {
      id: '2eb87be0-c8c9-4253-887b-00773738cb43',
      type: 'decision',
      position: {
        x: 256.0938539430729,
        y: 222.14238197452403,
      },
      data: {
        taskName: '',
        status: 'waiting',
        label: '조건',
        condition: [
          {
            id: '6b2bf4ec-03a7-472b-880d-d49e7fd19a8b',
            label: '1',
            conditionType: 'expression',
            targetNodeId: '92773be7-3c78-4d31-9996-a30b05846219',
            expression: '1',
          },
          {
            id: '0535434e-94d5-4562-bac5-18a7f033ca5f',
            label: '2',
            conditionType: 'expression',
            targetNodeId: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46',
            expression: '3',
          },
        ],
      },
      measured: {
        width: 80,
        height: 44,
      },
      selected: false,
    },
    {
      id: '53e045ad-e038-4fe9-996e-3c28d6c22c38',
      type: 'merge',
      position: {
        x: -25.09397800157523,
        y: 456.10284586035743,
      },
      data: {
        taskName: '',
        status: 'waiting',
        label: '병합',
      },
      measured: {
        width: 80,
        height: 44,
      },
      selected: false,
    },
    {
      id: '92773be7-3c78-4d31-9996-a30b05846219',
      type: 'task',
      position: {
        x: 349.24276421575814,
        y: 353.5955170322388,
      },
      data: {
        taskName: '작업2',
        status: 'waiting',
        label: '실패 시 종료 처리',
        taskType: 'http',
      },
      measured: {
        width: 194,
        height: 44,
      },
      selected: false,
    },
    {
      id: 'a9cf5a8c-b81b-4467-96cd-253bc0316826',
      type: 'task',
      position: {
        x: -240.79811225915967,
        y: 351.4061460569271,
      },
      data: {
        taskName: '작업 2',
        status: 'waiting',
        label: '성공 시 데이터 선 가공',
        taskType: 'script',
      },
      measured: {
        width: 237,
        height: 44,
      },
      selected: true,
    },
    {
      id: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46',
      type: 'task',
      position: {
        x: 44.78322491838449,
        y: 352.4498088793829,
      },
      data: {
        taskName: '작업 2',
        status: 'waiting',
        label: '성공 시 데이터 선 가공2',
        taskType: 'script',
      },
      measured: {
        width: 247,
        height: 44,
      },
      selected: false,
    },
    {
      id: '08c8fad9-bc88-4249-8fa0-6d984fc9ac52',
      type: 'end',
      position: {
        x: -31.084247583584546,
        y: 562.0336251833631,
      },
      data: {
        taskName: '',
        status: 'waiting',
        label: '종료',
      },
      measured: {
        width: 80,
        height: 44,
      },
      selected: false,
    },
    {
      id: 'd6311fee-0a37-4f54-ae4b-34c63fc6d76a',
      type: 'end',
      position: {
        x: 407.6084495700589,
        y: 494.7766966202232,
      },
      data: {
        taskName: '',
        status: 'waiting',
        label: '종료',
      },
      measured: {
        width: 80,
        height: 44,
      },
    },
  ],
  edges: [
    {
      source: 'bbc9a700-ff82-4a0f-a029-5cfa3cd191d9',
      sourceHandle: 'bbc9a700-ff82-4a0f-a029-5cfa3cd191d9-out',
      target: '1e4f76f2-decf-4f6b-b087-657af0fa9336',
      targetHandle: '1e4f76f2-decf-4f6b-b087-657af0fa9336-in',
      id: 'eed5a9e9-93b3-402e-8593-69f2d477fa3f',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '1e4f76f2-decf-4f6b-b087-657af0fa9336',
      sourceHandle: '1e4f76f2-decf-4f6b-b087-657af0fa9336-out',
      target: '2eb87be0-c8c9-4253-887b-00773738cb43',
      targetHandle: '2eb87be0-c8c9-4253-887b-00773738cb43-in',
      id: 'aaa3da6d-2dbe-471b-9985-a7461a0f00a2',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '2eb87be0-c8c9-4253-887b-00773738cb43',
      sourceHandle: '2eb87be0-c8c9-4253-887b-00773738cb43-false',
      target: '92773be7-3c78-4d31-9996-a30b05846219',
      targetHandle: '92773be7-3c78-4d31-9996-a30b05846219-in',
      id: '1d14e6f8-d863-4e29-bca6-8878e1a625a5',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '2eb87be0-c8c9-4253-887b-00773738cb43',
      sourceHandle: '2eb87be0-c8c9-4253-887b-00773738cb43-true',
      target: 'a9cf5a8c-b81b-4467-96cd-253bc0316826',
      targetHandle: 'a9cf5a8c-b81b-4467-96cd-253bc0316826-in',
      id: 'a5e9b344-abcb-4e66-92d0-5dc72ab5fbcb',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '2eb87be0-c8c9-4253-887b-00773738cb43',
      sourceHandle: '2eb87be0-c8c9-4253-887b-00773738cb43-true',
      target: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46',
      targetHandle: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46-in',
      id: '48832742-7d8c-4c54-ab79-df9918ddf664',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46',
      sourceHandle: '6e4e41c1-8cd1-4bc7-8965-f3658d1dac46-out',
      target: '53e045ad-e038-4fe9-996e-3c28d6c22c38',
      targetHandle: '53e045ad-e038-4fe9-996e-3c28d6c22c38-in2',
      id: 'fcc2c95a-56eb-40df-9faf-5955f777fcfc',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: 'a9cf5a8c-b81b-4467-96cd-253bc0316826',
      sourceHandle: 'a9cf5a8c-b81b-4467-96cd-253bc0316826-out',
      target: '53e045ad-e038-4fe9-996e-3c28d6c22c38',
      targetHandle: '53e045ad-e038-4fe9-996e-3c28d6c22c38-in1',
      id: '0a4ee7d3-282c-45dc-ab15-0409b31dc198',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '53e045ad-e038-4fe9-996e-3c28d6c22c38',
      sourceHandle: '53e045ad-e038-4fe9-996e-3c28d6c22c38-out',
      target: '08c8fad9-bc88-4249-8fa0-6d984fc9ac52',
      targetHandle: '08c8fad9-bc88-4249-8fa0-6d984fc9ac52-in',
      id: 'ab936e00-fc00-4d4d-8697-de580b18f419',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
    {
      source: '92773be7-3c78-4d31-9996-a30b05846219',
      sourceHandle: '92773be7-3c78-4d31-9996-a30b05846219-out',
      target: 'd6311fee-0a37-4f54-ae4b-34c63fc6d76a',
      targetHandle: 'd6311fee-0a37-4f54-ae4b-34c63fc6d76a-in',
      id: 'aef8714c-3281-46d0-a204-f909f9c58322',
      type: 'default',
      label: '',
      animated: true,
      style: {
        stroke: '#888',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#555',
        fontWeight: 'bold',
      },
      data: {
        status: 'waiting',
        label: '',
      },
    },
  ],
};
export const workflowDefaultValues: IWorkflow = {
  id: uuid(),
  name: '',
  description: '',
  regData: Date.now(),
  modDate: Date.now(),
  nodes: [],
  edges: [],
};
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

export const getConnectedSourceOptions = (
  nodes: CustomNode[],
  edges: CustomEdge[],
  selectedNodeId?: string
) => {
  if (!selectedNodeId) return [];
  //선택한 노드로 향하는 엣지만 필터링
  const connectedEdges = edges.filter((e) => e.target === selectedNodeId);
  //연결된 source 노드 ID 추출
  const connectedSourceIds = connectedEdges.map((e) => e.source);
  //현재 선택된 노드에 연결된 노드 필터링
  const connectedNodes = nodes.filter((n) => connectedSourceIds.includes(n.id));
  //드랍다운 옵션 변환
  return connectedNodes.map((n) => ({
    key: n.id,
    text: n.data?.label || n.id,
  }));
};

export const getConnectedTargetOptions = (
  nodes: CustomNode[],
  edges: CustomEdge[],
  selectedNodeId?: string
) => {
  if (!selectedNodeId) return [];
  //선택한 노드에서 나가는 엣지들 찾기
  const connectedEdges = edges.filter((e) => e.source === selectedNodeId);
  //연결된 source 노드 ID 추출
  const connectedSourceIds = connectedEdges.map((e) => e.target);
  //현재 선택된 노드에 연결된 노드 필터링
  const connectedNodes = nodes.filter((n) => connectedSourceIds.includes(n.id));
  //드랍다운 옵션 변환
  return connectedNodes.map((n) => ({
    key: n.id,
    text: n.data?.label || n.id,
  }));
};

import type { CustomEdge } from '../../../../state/edges';
import type { DecisionNodeType, IDecisionNodeData, IFlowContext } from '../../types';

export const executeDecisionNode = async (
  node: DecisionNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string, completedNodeId: string) => Promise<void>
) => {
  const data = node.data as IDecisionNodeData;
  const conditions = data.condition || [];

  // 조건 우선순위대로 탐색
  let nextEdge = null;
  const prevId = context?.current?.prevNodeId as string;
  const prevResult = context.nodeResults[prevId];
  for (const cond of conditions) {
    try {
      let result = false;

      switch (cond.conditionType) {
        case 'expression':
          if (cond.expression) {
            const func = new Function('prev', `return prev?.${cond.expression}`);
            result = func(prevResult);
          }
          break;

        case 'static':
          result = prevResult === cond.staticValue;
          break;

        case 'regex':
          if (cond.pattern && cond.dataAccessKey) {
            const value = context.current?.[cond.dataAccessKey] ?? '';
            const regex = new RegExp(cond.pattern);
            result = regex.test(String(value));
          }
          break;
      }

      if (result && cond.targetNodeId) {
        // 조건이 참이면 해당 targetNodeId를 가지는 edge 선택
        nextEdge = edges.find((e) => e.source === node.id && e.target === cond.targetNodeId);
        break;
      }
    } catch (err) {
      console.error(`DecisionNode expression error in ${node.id} [condition ${cond.id}]:`, err);
      throw err;
    }
  }

  // 모든 조건이 false면 fallbackTarget edge 사용
  if (!nextEdge && data.fallbackTarget) {
    nextEdge = edges.find((e) => e.source === node.id && e.target === data.fallbackTarget);
  }

  if (nextEdge) {
    await walk(nextEdge.target, node.id);
  } else {
    console.warn(`DecisionNode ${node.id} has no valid next node.`);
    throw Error('매치되는 조건이 없습니다');
  }
};

import type { CustomEdge } from '../../../../state/edges';
import { getOutgoingEdges } from '../../constants/workflow.constants';
import type { DecisionNodeType, IDecisionNodeData, IFlowContext, NodeStatus } from '../../types';

export const executeDecisionNode = async (
  node: DecisionNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string, completedNodeId: string) => Promise<void>,
  updateNodeStatus: (id: string, status: NodeStatus) => void,
  updateEdgeStatus: (id: string, status: NodeStatus) => void
) => {
  const data = node.data as IDecisionNodeData;
  const conditions = data.condition || [];
  const outgoingEdges = getOutgoingEdges(node.id, edges);

  let nextEdge: CustomEdge | null = null;

  try {
    // 이전 노드 결과
    const prevId = context?.current?.prevNodeId as string;
    const prevResult = context.nodeResults[prevId];

    const matchedCondition = conditions.find((cond) => {
      if (!cond.expression) return false;
      try {
        const matchFn = new Function('context', `return context?.${cond.expression}`);
        return matchFn(prevResult);
      } catch {
        return false;
      }
    });

    if (matchedCondition) {
      nextEdge = outgoingEdges.find((e) => e.target === matchedCondition.targetNodeId) || null;
    } else if (data.fallbackTarget) {
      nextEdge = outgoingEdges.find((e) => e.target === data.fallbackTarget) || null;
    }
  } catch (err) {
    console.error(`예상치 못한 에러 ${node.id}:`, err);
    updateNodeStatus(node.id, 'failed');
    outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'failed'));
    throw err;
  }

  if (nextEdge) {
    updateNodeStatus(node.id, 'done');
    outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'waiting'));
    updateEdgeStatus(nextEdge.id, 'done');
    await walk(nextEdge.target, node.id);
  } else {
    throw Error('매치되는 조건이 없습니다');
  }
};

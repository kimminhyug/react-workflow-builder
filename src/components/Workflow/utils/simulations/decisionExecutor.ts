import type { CustomEdge } from '../../../../state/edges';
import type { DecisionNodeType, IDecisionNodeData, IFlowContext } from '../../types';

export const executeDecisionNode = async (
  node: DecisionNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string) => Promise<void>
) => {
  const data = node.data as IDecisionNodeData;
  const conditions = data.condition || [];

  let matchedEdge: CustomEdge | null = null;

  for (const cond of conditions) {
    if (!cond.expression) continue;
    try {
      const result = new Function('context', `return ${cond.expression}`)(context);
      if (result) {
        matchedEdge = edges.find((e) => e.data?.label === cond.label) || null;
        break;
      }
    } catch (err) {
      console.error(`Decision expression error in ${node.id}:`, err);
    }
  }

  if (matchedEdge) {
    await walk(matchedEdge.target);
  } else if (data.fallbackTarget) {
    await walk(data.fallbackTarget);
  } else {
    console.warn(`DecisionNode fallback 없음: ${node.id}`);
  }
};

import type { CustomEdge } from '../../../../state/edges';
import type { IFlowContext, TaskNodeType } from '../../types';

export const executeTaskNode = async (
  node: TaskNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string, completedNodeId: string) => Promise<void>
) => {
  if (node.data.execute) {
    try {
      await node.data.execute(context, node);
    } catch (err) {
      throw err;
    }
  }

  const next = edges.find((e) => e.source === node.id);
  if (next) await walk(next.target, node.id);
};

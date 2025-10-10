import type { CustomEdge } from '../../../../state/edges';
import type { IFlowContext, TaskNodeType } from '../../types';

export const executeTaskNode = async (
  node: TaskNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string) => Promise<void>
) => {
  if (node.data.execute) {
    try {
      await node.data.execute(context);
    } catch (err) {
      console.error(`Task execute error: ${err}`);
    }
  }

  const next = edges.find((e) => e.source === node.id);
  if (next) await walk(next.target);
};

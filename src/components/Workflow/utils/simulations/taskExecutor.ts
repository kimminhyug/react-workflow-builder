import type { CustomEdge } from '../../../../state/edges';
import { getOutgoingEdges } from '../../constants/workflow.constants';
import type { IFlowContext, NodeStatus, TaskNodeType } from '../../types';

export const executeTaskNode = async (
  node: TaskNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string, completedNodeId: string) => Promise<void>,
  updateNodeStatus: (id: string, status: NodeStatus) => void,
  updateEdgeStatus: (id: string, status: NodeStatus) => void
) => {
  const outgoingEdges = getOutgoingEdges(node.id, edges);
  if (node.data.execute) {
    try {
      await node.data.execute(context, node);
    } catch (err) {
      updateNodeStatus(node.id, 'failed');
      outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'failed'));
      throw err;
    }
    updateNodeStatus(node.id, 'done');
    outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'done'));
  }

  const next = edges.find((e) => e.source === node.id);
  if (next) await walk(next.target, node.id);
};

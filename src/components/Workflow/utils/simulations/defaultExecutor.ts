import type { CustomEdge } from '../../../../state/edges';
import { getOutgoingEdges } from '../../constants/workflow.constants';
import type { CustomNode, NodeStatus } from '../../types';

export const executeDefaultNode = async (
  node: CustomNode,
  edges: CustomEdge[],

  walk: (id: string, completedNodeId: string) => Promise<void>,
  _updateNodeStatus: (id: string, status: NodeStatus) => void,
  updateEdgeStatus: (id: string, status: NodeStatus) => void
) => {
  const outgoingEdges = getOutgoingEdges(node.id, edges);

  if (outgoingEdges.length > 1) {
    await Promise.all(outgoingEdges.map((e) => walk(e.target, node.id)));
  } else if (outgoingEdges.length === 1) {
    const next = edges.find((e) => e.source === node.id);
    updateEdgeStatus(next!.id, 'done');
    await walk(outgoingEdges[0].target, node.id);
  }

  // const next = edges.find((e) => e.source === node.id);
  // if (next) await walk(next.target);
};

import type { CustomEdge } from '../../../../state/edges';
import { getOutgoingEdges } from '../../constants/workflow.constants';
import type { CustomNode, IFlowContext, MergeNodeType, NodeStatus } from '../../types';

export const executeMergeNode = async (
  node: MergeNodeType,
  _context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string, completedNodeId: string) => Promise<void>,
  nodes: CustomNode[],
  updateNodeStatus: (id: string, status: NodeStatus) => void,
  updateEdgeStatus: (id: string, status: NodeStatus) => void
) => {
  const outgoingEdges = getOutgoingEdges(node.id, edges);
  const inputIds = node.data.inputs || [];
  const inputNodes = nodes.filter((n) => inputIds.includes(n.id));

  const allDone = inputNodes.every((n) => n.data.status === 'done');
  const anyFailed = inputNodes.some((n) => n.data.status === 'failed');

  if (anyFailed) {
    node.data.status = 'failed';
    console.warn(`MergeNode ${node.id} 실패, fallback 필요`);
    updateNodeStatus(node.id, 'failed');
    outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'failed'));
    return;
  }

  if (!allDone) {
    console.log(`MergeNode ${node.id} 대기 중`);
    return;
  }
  updateNodeStatus(node.id, 'done');
  outgoingEdges.forEach((e) => updateEdgeStatus(e.id, 'done'));

  const nextEdge = edges.find((e) => e.source === node.id);
  if (nextEdge) await walk(nextEdge.target, node.id);
};

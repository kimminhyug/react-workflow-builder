import type { CustomEdge } from '../../../../state/edges';
import type { CustomNode, IFlowContext, MergeNodeType } from '../../types';

export const executeMergeNode = async (
  node: MergeNodeType,
  _context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string) => Promise<void>,
  nodes: CustomNode[]
) => {
  const inputIds = node.data.inputs || [];
  const inputNodes = nodes.filter((n) => inputIds.includes(n.id));

  const allDone = inputNodes.every((n) => n.data.status === 'done');
  const anyFailed = inputNodes.some((n) => n.data.status === 'failed');

  if (anyFailed) {
    node.data.status = 'failed';
    console.warn(`MergeNode ${node.id} 실패, fallback 필요`);
    return;
  }

  if (!allDone) {
    console.log(`MergeNode ${node.id} 대기 중`);
    return;
  }

  node.data.status = 'done';
  const nextEdge = edges.find((e) => e.source === node.id);
  if (nextEdge) await walk(nextEdge.target);
};

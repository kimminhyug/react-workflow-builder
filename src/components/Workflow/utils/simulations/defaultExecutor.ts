import type { CustomEdge } from '../../../../state/edges';
import type { CustomNode } from '../../types';

export const executeDefaultNode = async (
  node: CustomNode,
  edges: CustomEdge[],
  walk: (id: string) => Promise<void>
) => {
  const next = edges.find((e) => e.source === node.id);
  if (next) await walk(next.target);
};

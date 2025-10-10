import { useAtom } from 'jotai';
import { activeNodeIdAtom } from '../state/nodes';
import { selectedNodeAtom } from '../state/selectedNode';

export const useNodeStatus = (id: string, status?: string) => {
  // active 시물레이션 실행중
  const [activeNodeId] = useAtom(activeNodeIdAtom);
  const [selectedNode] = useAtom(selectedNodeAtom);

  const isSelected = selectedNode?.id === id;
  const isActive = activeNodeId === id;

  const statusClass = status ?? 'waiting';

  const nodeClass = ['neon-node', statusClass, isActive && 'active', isSelected && 'selected']
    .filter(Boolean)
    .join(' ');

  return { isSelected, isActive, nodeClass };
};

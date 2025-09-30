import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { activeNodeIdAtom, applyNodeUpdate, nodesAtom } from '../state/nodes';

/**
 * 선택된 노드와 nodes를 함께 관리하는 훅
 */
export const useSelectedNode = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [selectedNodeId, setSelectedNodeId] = useAtom(activeNodeIdAtom);

  // 선택된 노드 객체
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) || null;

  // 노드 선택
  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  // 선택 노드 업데이트
  const updateSelectedNode = useCallback(() => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((node) => (node.id === selectedNode.id ? applyNodeUpdate(node, selectedNode) : node))
    );
  }, [selectedNode, setNodes]);

  return { selectedNode, selectNode, updateSelectedNode };
};

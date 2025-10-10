import { useAtom } from 'jotai';
import type { CustomNode } from '../components/Workflow/types';
import { applyNodeUpdate, nodesAtom } from '../state/nodes';

export const useUpdateNode = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);

  /**
   * node id를 이용하여 특정 노드의 data를 업데이트
   * @param nodeId 업데이트 할 노드 ID
   * @returns void
   */
  const updateNode = (nodeId: string, newData: CustomNode['data']) => {
    const _node = nodes.find((n) => n.id === nodeId);
    if (!_node) return;
    const newNode = { ..._node, data: { ..._node.data, ...newData } } as CustomNode;
    updateNodeById(applyNodeUpdate(_node, newNode));
  };

  const updateNodeById = (updatedNode: CustomNode): void => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => (n.id === updatedNode.id ? applyNodeUpdate(n, updatedNode) : n))
    );
  };

  return { nodes, setNodes, updateNode, updateNodeById };
};

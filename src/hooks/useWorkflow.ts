import { useAtom } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { selectedNodeAtom } from '../state/selectedNode';
import { nodesAtom } from '../state/nodes';
import { cloneDeep } from 'lodash';
import type { CustomNode } from '../components/Workflow/types';

export const useWorkflow = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

  const copyNode = (newId: string) => {
    if (!selectedNode) return;
    const copiedNode: CustomNode = cloneDeep(selectedNode);
    setNodes((prev) => [...prev, { ...copiedNode, label: newId }]);
  };

  const deleteNode = (id: string) => {
    if (!selectedNode) return;
    setNodes((prev) => [...prev.filter((node) => node.data.label === id)]);
  };

  return { copyNode, deleteNode };
};

// useKeyboradController 작업필요

import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { selectedNodeAtom } from '../state/selectedNode';
import { useUpdateNode } from './useNodeUpdater';

export const useSyncNodeData = () => {
  const methods = useFormContext();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const formValues = useWatch({ control: methods.control });
  const { updateNode } = useUpdateNode();
  //폼 수정시 선택된 노드 자동 업데이트 처리
  useEffect(() => {
    if (!selectedNode) return;
    updateNode(selectedNode.id, { ...selectedNode.data, ...formValues });
  }, [formValues, selectedNode]);
};

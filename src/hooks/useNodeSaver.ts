import { useAtom, useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import type { CustomNode, IWorkflow, NodeDataType } from '../components/Workflow/types';
import { selectedNodeAtom } from '../state/selectedNode';
import { currentWorkflowAtom } from '../state/workflow';

interface IUseNodeSaverProps {
  onSave?: (data: IWorkflow, nodes: CustomNode[], node: CustomNode) => void;
}

/**
 * 선택한 노드를 workflow에 반영 할 떄 사용하는 함수(폼에서 사용하기에 react-hook-form에 의존)
 * @param props.onSave (data: IWorkflow, nodes: CustomNode[], node: CustomNode) => void;  커스텀할 필요가 있는 경우 사용
 * @returns () => methods.handleSubmit(save);
 */
export const useNodeSaver = (props?: IUseNodeSaverProps) => {
  const [currentWorkflow, setCurrentWorkflow] = useAtom(currentWorkflowAtom);
  const selectedNode = useAtomValue(selectedNodeAtom);
  const methods = useFormContext();

  const save = (nodeData: NodeDataType) => {
    if (!selectedNode) return;
    const updatedData = {
      ...currentWorkflow,
      nodes: currentWorkflow.nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, ...nodeData } } : n
      ),
    };

    setCurrentWorkflow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, ...nodeData } } : n
      ),
    }));

    if (props?.onSave) {
      props.onSave(updatedData, updatedData.nodes, selectedNode);
    }
  };

  return () => methods.handleSubmit(save);
};

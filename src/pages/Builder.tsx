import { ReactFlowProvider } from '@xyflow/react';
import { NodeEditor } from '../components/Workflow/NodeEditor';
import { WorkflowFAB } from '../components/Workflow/WorkflowFAB/WorkflowFAB';
import { WorkflowCanvas } from './WorkflowCanvas';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { dummyWorkflow } from '../components/Workflow/constants/workflow.constants';
import type { IBuilderProps } from '../components/Workflow/types';
import { useUpdateNode } from '../hooks/useNodeUpdater';
import { edgesAtom } from '../state/edges';
import { selectedNodeAtom } from '../state/selectedNode';
import { currentWorkflowAtom } from '../state/workflow';
import { getNodeValidationSchemas } from '../validation';

export const Builder: React.FC<IBuilderProps> = ({ workflow = dummyWorkflow }) => {
  //기본 초기 값
  const [, setCurrentWorkflow] = useAtom(currentWorkflowAtom);
  const { setNodes } = useUpdateNode();
  const setEdges = useSetAtom(edgesAtom);
  // workflow가 props로 들어왔으면 불러오기
  useEffect(() => {
    if (workflow) {
      setCurrentWorkflow(workflow);
      setNodes(workflow.nodes);
      setEdges(workflow.edges);
    }
  }, [workflow]);

  const [selectedNode] = useAtom(selectedNodeAtom);
  const selectedNodeData = selectedNode?.data;
  const { i18n, t } = useTranslation();
  const schemaSet = useMemo(() => getNodeValidationSchemas(t), [i18n.language]);
  const schema = useMemo(() => {
    if (selectedNode?.type === 'task') return schemaSet.task;
    else if (selectedNode?.type === 'switch') return schemaSet.switch;
    else if (selectedNode?.type === 'decision') return schemaSet.decision;
    else if (selectedNode?.type === 'merge') return schemaSet.merge;
    else return undefined;
  }, [selectedNode?.type, schemaSet]);

  const methods = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: selectedNodeData || {},
    mode: 'onChange',
  });

  useEffect(() => {
    methods.reset(selectedNodeData || {});
  }, [selectedNode?.id]);

  // control, handleSubmit
  // const onSubmit = (data: NodeDataType) => {
  //   console.log('submit:', data);
  // };

  return (
    <>
      <FormProvider {...methods}>
        <ReactFlowProvider>
          <div className={'flow-container'}>
            <div className={'flow-wrapper'}>
              <WorkflowFAB />
              <WorkflowCanvas />
            </div>
            <NodeEditor />
          </div>
        </ReactFlowProvider>
      </FormProvider>
    </>
  );
};

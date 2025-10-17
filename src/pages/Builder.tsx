import { ReactFlowProvider } from '@xyflow/react';
import { NodeEditor } from '../components/Workflow/NodeEditor';
import { WorkflowFAB } from '../components/Workflow/WorkflowFAB/WorkflowFAB';
import { WorkflowCanvas } from './WorkflowCanvas';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import type {
  IDecisionNodeData,
  ISwitchNodeData,
  ITaskNodeData,
} from '../components/Workflow/types';
import { selectedNodeAtom } from '../state/selectedNode';
import { getNodeValidationSchemas } from '../validation';

// TaskNode 스키마
export const taskNodeSchema: yup.ObjectSchema<Omit<ITaskNodeData, 'execute'>> = yup.object({
  taskName: yup.string().required('작업 이름은 필수입니다.'),
  taskType: yup.mixed<'http' | 'db' | 'script'>().required('작업 유형은 필수입니다.'),
  inputSource: yup.string().optional(),
  label: yup.string().optional(),
  description: yup.string().optional(),
});

// SwitchNode 스키마
export const switchNodeSchema: yup.ObjectSchema<Omit<ISwitchNodeData, 'execute'>> = yup.object({
  cases: yup.array().of(yup.string().required()).min(1, '최소 한 개의 분기가 필요합니다.'),
  fallbackTarget: yup.string().optional(),
  label: yup.string().optional(),
  description: yup.string().optional(),
});

// DecisionNode 스키마
export const decisionNodeSchema: yup.ObjectSchema<Omit<IDecisionNodeData, 'execute'>> = yup.object({
  condition: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        label: yup.string().required(),
        conditionType: yup.mixed<'static' | 'regex' | 'expression'>().required(),
        priority: yup.number().optional(),
        dataAccessKey: yup.string().optional(),
        pattern: yup.string().optional(),
        expression: yup.string().optional(),
      })
    )
    .optional(),
  fallbackTarget: yup.string().optional(),
  label: yup.string().optional(),
  description: yup.string().optional(),
});

export const Builder = () => {
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
  });

  useEffect(() => {
    methods.reset(selectedNodeData);
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

import * as yup from 'yup';
import type {
  IDecisionNodeData,
  IMergeNodeData,
  ITaskNodeData,
} from '../components/Workflow/types';

/**
 * @param t 다국어용 t 함수
 * @returns 노드별 yup Validation 스키마
 */
export const getNodeValidationSchemas = (t: (key: string) => string) => {
  // 공통 스키마
  const commonSchema = yup.object({
    label: yup.string().required(t('validation.common.labelRequired')),
  });

  // TaskNode 스키마
  const taskSchema: yup.ObjectSchema<Omit<ITaskNodeData, 'execute'>> = yup.object({
    taskName: yup.string().required(t('validation.task.taskNameRequired')),
    taskType: yup.mixed<'http' | 'db' | 'script'>().required(t('validation.task.taskTypeRequired')),
    inputSource: yup.string().optional(),
    label: yup.string().optional(),
    description: yup.string().optional(),
  });

  const conditionSchema = yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(t('validation.condition.conditionIdRequired')),
        label: yup.string().required(t('validation.condition.conditionLabelRequired')),
        conditionType: yup
          .mixed<'static' | 'regex' | 'expression'>()
          .required(t('validation.condition.conditionTypeRequired')),
        priority: yup.number().optional(),
        dataAccessKey: yup.string().optional(),
        pattern: yup.string().optional(),
        expression: yup.string().optional(),
        targetNodeId: yup.string().optional(),
        staticValue: yup.string().optional(),
      })
    )
    .optional();
  // DecisionNode 스키마
  const decisionSchema: yup.ObjectSchema<Omit<IDecisionNodeData, 'execute'>> = yup.object({
    condition: conditionSchema,
    fallbackTarget: yup.string().optional(),
    label: yup.string().optional(),
    description: yup.string().optional(),
  });

  // MergeNode 스키마
  const mergeSchema: yup.ObjectSchema<Omit<IMergeNodeData, 'execute'>> = commonSchema.shape({
    mergeName: yup.string().required(t('validation.merge.mergeNameRequired')),
    inputs: yup.array().of(yup.string()).min(1, t('validation.merge.inputsRequired')),
  });

  // InputNode 스키마
  //   const inputSchema: yup.ObjectSchema<Omit<any, 'execute'>> = commonSchema.shape({
  //     inputKey: yup.string().required(t('validation.input.inputKeyRequired')),
  //     defaultValue: yup.string(),
  //   });

  return {
    task: taskSchema,
    decision: decisionSchema,
    merge: mergeSchema,
    // input: inputSchema,
  };
};

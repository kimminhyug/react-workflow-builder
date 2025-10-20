import { atom } from 'jotai';
import { workflowDefaultValues } from '../components/Workflow/constants/workflow.constants';
import type { IWorkflow } from '../components/Workflow/types';

export const currentWorkflowAtom = atom<IWorkflow>(workflowDefaultValues);

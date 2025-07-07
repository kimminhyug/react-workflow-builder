import { atom } from 'jotai';
import type { CustomNode } from '../components/Workflow/types';

export const selectedNodeAtom = atom<CustomNode | null>(null);

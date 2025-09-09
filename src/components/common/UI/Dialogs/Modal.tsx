// src/components/ui/Modal.tsx
import { Modal as FluentModal } from '@fluentui/react';
import type { IModalProps } from '../types';
export const Modal = (props: IModalProps) => {
  return <FluentModal {...props} />;
};

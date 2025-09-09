import { TextField as FluentTextField } from '@fluentui/react';
import type { ITextFieldProps } from '../types';
export const TextField = (props: ITextFieldProps) => {
  return <FluentTextField {...props} />;
};

import { Stack as FluentStack } from '@fluentui/react';
import type { IStackProps } from '../types';

export const Stack = (props: IStackProps) => {
  return <FluentStack {...props} />;
};

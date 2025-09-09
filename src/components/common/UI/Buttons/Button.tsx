import { PrimaryButton } from '@fluentui/react';

import type { IButtonProps } from '../types';

export const Button = (props: IButtonProps) => {
  return <PrimaryButton {...props} />;
};

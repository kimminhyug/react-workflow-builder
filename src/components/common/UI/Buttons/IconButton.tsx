import { IconButton as FluentIconButton } from '@fluentui/react';

import type { IButtonProps, IIconProps } from '../types';

interface IProps extends IButtonProps {
  icon: IIconProps['iconName'];
}

export const IconButton = ({ icon, ...props }: IProps) => {
  return <FluentIconButton iconProps={{ iconName: icon }} {...props} />;
};

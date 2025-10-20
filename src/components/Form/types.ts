import type { IDropdownProps, ITextFieldProps } from '../common/UI';

export interface IBaseControllerProps {
  name: string;
  //   control: any;
}

export interface ITextFieldControllerProps
  extends IBaseControllerProps,
    Omit<ITextFieldProps, 'name'> {
  multiline?: boolean;
  placeholder?: string;
}

export interface IDropdownControllerProps extends IBaseControllerProps, IDropdownProps {}

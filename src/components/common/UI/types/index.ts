//추후 ui 라이브러리 교체 시, 유지보수 십도록 타입 따로 관리
import type {
  IButtonProps as IFluentButtonProps,
  ITextFieldProps as IFluentTextFieldProps,
  IDropdownProps as IFluentDropdownProps,
  IStackProps as IFluentStackProps,
  IModalProps as IFluentModalProps,
  IIconProps as IFluentIconProps,
} from '@fluentui/react';

export interface IButtonProps extends IFluentButtonProps {
  'data-testid'?: string;
}
export interface ITextFieldProps extends IFluentTextFieldProps {
  'data-testid'?: string;
}

export interface IDropdownProps extends IFluentDropdownProps {
  'data-testid'?: string;
}

export interface IStackProps extends IFluentStackProps {
  'data-testid'?: string;
}

export interface IModalProps extends IFluentModalProps {
  'data-testid'?: string;
}
export interface IIconProps extends IFluentIconProps {
  'data-testid'?: string;
}

export type { IDropdownOption } from '@fluentui/react';

//추후 ui 라이브러리 교체 시, 유지보수 십도록 타입 따로 관리
import type {
  IButtonProps as IFluentButtonProps,
  IDropdownProps as IFluentDropdownProps,
  IIconProps as IFluentIconProps,
  ITag as IFluentITag,
  IModalProps as IFluentModalProps,
  IPivotItemProps as IFluentPivotItemProps,
  IPivotProps as IFluentPivotProps,
  IStackProps as IFluentStackProps,
  ITagPickerProps as IFluentTagPickerProps,
  ITextFieldProps as IFluentTextFieldProps,
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
export interface ITag extends IFluentITag {}
export interface ITagPickerProps extends IFluentTagPickerProps {
  'data-testid'?: string;
}
export interface IModalProps extends IFluentModalProps {
  'data-testid'?: string;
}
export interface IIconProps extends IFluentIconProps {
  'data-testid'?: string;
}

export interface IPivotProps extends IFluentPivotProps {
  'data-testid'?: string;
}
export interface ISidePanelTabItem {
  key: string;
  headerText: string;
  content: React.ReactNode;
}

export interface IPivotItemProps extends IFluentPivotItemProps {
  'data-testid'?: string;
}

export type { IDropdownOption } from '@fluentui/react';

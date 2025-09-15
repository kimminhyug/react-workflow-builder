import { Pivot as FluentPivot, PivotItem as FluentPivotItem } from '@fluentui/react';
import type { IPivotProps, IPivotItemProps } from '../types';
import React from 'react';

export const Pivot = (props: IPivotProps) => {
  return <FluentPivot {...props}>{props.children}</FluentPivot>;
};

export const PivotItem = (props: IPivotItemProps) => {
  return React.cloneElement(<FluentPivotItem />, props);
};
//readonly를 강제로 바꾸는 방식이라 좋진 않지만, 라이브러리가 name체크를 강제(name은 빌드시 중복체크를 우회하기에 동적으로 넘버링 처리 됨(PivotItem2등))하고 있기 떄문에 우회처리
//PivotItem은 별도의 wrapper처리를 안하는 방식도 괜찮지않을까 생각이 듬
Object.defineProperty(PivotItem, 'name', { value: FluentPivotItem.name });

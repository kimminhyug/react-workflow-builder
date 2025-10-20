import { TextField as FluentTextField, mergeStyleSets } from '@fluentui/react';
import { useMemo } from 'react';
import { neonTextFieldStyles } from '../../styles';
import type { ITextFieldProps } from '../types';
export const TextField = (props: ITextFieldProps) => {
  const styles = useMemo(
    () => (props.styles ? mergeStyleSets(neonTextFieldStyles, props.styles) : neonTextFieldStyles),
    [props?.styles]
  );

  return <FluentTextField {...props} styles={styles} />;
};

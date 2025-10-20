import { TagPicker as FluentTagPicker, mergeStyleSets } from '@fluentui/react';
import { useMemo } from 'react';
import { neonTagPickerStyles } from '../../styles';
import type { ITagPickerProps } from '../types';

export const TagPicker = (props: ITagPickerProps) => {
  const styles = useMemo(
    () => (props.styles ? mergeStyleSets(neonTagPickerStyles, props.styles) : neonTagPickerStyles),
    [props?.styles]
  );
  return <FluentTagPicker {...props} styles={styles} />;
};

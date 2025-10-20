import { Dropdown as FluentDropdown, mergeStyleSets } from '@fluentui/react';
import { useMemo } from 'react';
import { neonDropdownStyles } from '../../styles';
import type { IDropdownProps } from '../types';

export const Dropdown = (props: IDropdownProps) => {
  const styles = useMemo(
    () => (props.styles ? mergeStyleSets(neonDropdownStyles, props.styles) : neonDropdownStyles),
    [props?.styles]
  );

  return <FluentDropdown {...props} styles={styles} />;
};

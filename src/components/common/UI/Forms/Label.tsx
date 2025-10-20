import { Label as FluentLabel, mergeStyleSets, type ILabelProps } from '@fluentui/react';
import { useMemo } from 'react';
import { neonLabelStyles } from '../../styles';

export const Label = (props: ILabelProps) => {
  const styles = useMemo(
    () => (props.styles ? mergeStyleSets(neonLabelStyles, props.styles) : neonLabelStyles),
    [props?.styles]
  );
  return <FluentLabel {...props} styles={styles} />;
};

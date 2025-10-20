import { mergeStyleSets, PrimaryButton } from '@fluentui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { neonSaveButtonStyles } from '../../styles';
import type { IButtonProps } from '../types';

export const SaveButton = (props: IButtonProps) => {
  const styles = useMemo(
    () =>
      props.styles ? mergeStyleSets(neonSaveButtonStyles, props.styles) : neonSaveButtonStyles,
    [props?.styles]
  );
  const { t } = useTranslation('common');
  return (
    <PrimaryButton {...props} styles={styles}>
      {props?.children ? props?.children : t('save')}
    </PrimaryButton>
  );
};

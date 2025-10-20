import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../common/UI';
import { ErrorMessage } from './ErrorMessage';
import type { ITextFieldControllerProps } from './types';

export const TextFieldController: React.FC<ITextFieldControllerProps> = (props) => {
  const methods = useFormContext();
  const { t } = useTranslation('message');
  const { name, label, multiline = false, ...others } = props;
  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;

        return (
          <TextField
            {...others}
            label={label}
            multiline={multiline}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            errorMessage={error?.message ? <ErrorMessage message={t(error.message)} /> : ''}
          />
        );
      }}
    />
  );
};

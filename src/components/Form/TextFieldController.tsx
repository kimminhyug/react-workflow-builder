import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../common/UI';
import type { ITextFieldControllerProps } from './types';

export const TextFieldController: React.FC<ITextFieldControllerProps> = (props) => {
  const methods = useFormContext();
  const { name, label, multiline = false, ...others } = props;
  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        return (
          <TextField
            {...others}
            label={label}
            multiline={multiline}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
          />
        );
      }}
    />
  );
};

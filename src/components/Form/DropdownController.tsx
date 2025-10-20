import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '../common/UI';
import type { IDropdownControllerProps } from './types';

export const DropdownController: React.FC<IDropdownControllerProps> = (props) => {
  const { name, multiSelect, ...others } = props;
  const methods = useFormContext();
  const { t } = useTranslation('message');

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        if (multiSelect) {
          const selectedKeys: string[] = field.value || [];

          return (
            <Dropdown
              {...others}
              multiSelect
              errorMessage={error?.message ? t(error?.message) : ''}
              selectedKeys={selectedKeys}
              onChange={(_, option) => {
                const newSelectedKeys = option?.selected
                  ? [...selectedKeys, option.key as string]
                  : selectedKeys.filter((k) => k !== option?.key);
                field.onChange(newSelectedKeys);
              }}
            />
          );
        }

        const selectedKey = field.value ?? '';

        return (
          <Dropdown
            {...others}
            errorMessage={error?.message ? t(error?.message) : ''}
            selectedKey={selectedKey}
            onChange={(_, option) => field.onChange(option?.key ?? '')}
          />
        );
      }}
    />
  );
};

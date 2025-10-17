import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Dropdown } from '../common/UI';
import type { IDropdownControllerProps } from './types';

export const DropdownController: React.FC<IDropdownControllerProps> = (props) => {
  const { name, multiSelect, ...others } = props;
  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        if (multiSelect) {
          const selectedKeys: string[] = field.value || [];

          return (
            <Dropdown
              {...others}
              multiSelect
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
            selectedKey={selectedKey}
            onChange={(_, option) => field.onChange(option?.key ?? '')}
          />
        );
      }}
    />
  );
};

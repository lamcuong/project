'use client';

import * as React from 'react';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { FormField, FormItem } from './form';

type Option = {
  label: React.ReactNode;
  value: string;
};

type SelectFieldProps<TFieldValues extends FieldValues> =
  FieldWrapperPassThroughProps & {
    options?: Option[];
    className?: string;
    defaultValue?: string;
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    customRender?: (
      field: ControllerRenderProps<TFieldValues>,
      formState: UseFormStateReturn<TFieldValues>,
    ) => React.ReactNode;
  };

const SelectForm = <TFieldValues extends FieldValues>({
  label,
  error,
  options,
  className,
  control,
  defaultValue,
  name,
  customRender,
  ...props
}: SelectFieldProps<TFieldValues>) => {
  return (
    <FieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field, formState }) => {
          return (
            <FormItem>
              {customRender ? (
                customRender(field, formState)
              ) : (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  {...props}
                >
                  <SelectTrigger className="">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="">
                    {options?.map(({ label, value }) => (
                      <SelectItem key={label?.toString()} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormItem>
          );
        }}
      />
    </FieldWrapper>
  );
};

SelectForm.displayName = 'SelectFrom';

export { SelectForm };

import * as React from 'react';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { cn } from '@expense-management/frontend/lib/utils';
import { Input } from '../input';
import { FormField, FormItem } from './form';

export type InputFormProps<TFieldValues extends FieldValues = FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps & {
      className?: string;
      control: Control<TFieldValues>;
      name: Path<TFieldValues>;
      parse?: (value: string) => unknown;
      format?: (value: unknown) => string | number;
      customRender?: (
        field: ControllerRenderProps<TFieldValues>,
        formState: UseFormStateReturn<TFieldValues>,
      ) => React.ReactNode;
    };

const InputForm = <TFieldValues extends FieldValues = FieldValues>({
  className,
  type = 'text',
  label,
  error,
  control,
  name,
  defaultValue,
  format = (value) => value as string | number,
  parse = (value) => value,
  customRender,
  ...props
}: InputFormProps<TFieldValues>) => {
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
                <Input
                  {...field}
                  type={type}
                  onChange={(e) => field.onChange(parse(e.target.value))}
                  value={format(field.value)}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                  )}
                  {...props}
                />
              )}
            </FormItem>
          );
        }}
      />
    </FieldWrapper>
  );
};
InputForm.displayName = 'InputForm';

export { InputForm };

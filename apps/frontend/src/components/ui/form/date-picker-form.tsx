import { Control, FieldValues, Path } from 'react-hook-form';
import { DatePicker } from '../date-picker';
import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { FormField } from './form';

type DatePickerFormProps<TFieldValues extends FieldValues> =
  FieldWrapperPassThroughProps &
    React.ComponentProps<typeof DatePicker> & {
      control: Control<TFieldValues>;
      name: Path<TFieldValues>;
    };

const DatePickerForm = <TFieldValues extends FieldValues>({
  triggerButton,
  name,
  control,
  label,
  error,
  ...props
}: DatePickerFormProps<TFieldValues>) => {
  return (
    <FieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              selected={field.value}
              onSelect={field.onChange}
              triggerButton={triggerButton}
              mode={props.mode || 'single'}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};

export default DatePickerForm;

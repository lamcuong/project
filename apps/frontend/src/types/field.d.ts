import { InputProps } from '@expense-management/frontend/components/ui/input';
import { SelectProps } from '@expense-management/frontend/components/ui/select';

declare global {
  type Field = {
    inputTextProps?: InputProps;
    name: string;
    type: string;
    label?: React.ReactNode | string;
    selectProps?: SelectProps & {
      options: Array<{ label: string; value: string }>;
    };
  };
}
export {};

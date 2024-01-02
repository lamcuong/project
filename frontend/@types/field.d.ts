import { InputProps } from '@/components/ui/input';
import { SelectProps } from '@/components/ui/select';

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

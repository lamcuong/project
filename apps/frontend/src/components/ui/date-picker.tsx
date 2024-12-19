'use client';

import * as React from 'react';
import { cn } from '@expense-management/frontend/lib/utils';
import { Calendar } from './calendar';
import { useDisclosure } from '@expense-management/frontend/hooks/use-disclosure';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';

type BaseProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  triggerButton: React.ReactElement;
};

type DatePickerProps = React.ComponentProps<typeof Calendar> & BaseProps;

export function DatePicker({
  className,
  triggerButton,
  ...props
}: DatePickerProps) {
  const { isOpen, toggle, close } = useDisclosure();
  return (
    <div className={cn('grid gap-2', className)}>
      <DropdownMenu open={isOpen} onOpenChange={toggle}>
        <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-0">
          <Calendar
            onDayClick={() => {
              if (props.mode === 'single') {
                close();
              }
            }}
            {...props}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

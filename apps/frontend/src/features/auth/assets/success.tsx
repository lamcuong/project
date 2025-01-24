import { cn } from '@expense-management/frontend/lib/utils';
import React from 'react';

type SuccessIconProps = {
  className?: string;
};

const SuccessIcon: React.FC<SuccessIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide lucide-check', className)}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default SuccessIcon;

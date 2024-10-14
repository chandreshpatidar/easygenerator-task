import { cn } from '@/lib/utils/shared';
import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, className, htmlFor, required }) => {
  if (!children) {
    return null;
  }

  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-sm font-medium text-gray-700', className)}
    >
      {children}
      {required && <span className='ml-1'>*</span>}
    </label>
  );
};

export default Label;

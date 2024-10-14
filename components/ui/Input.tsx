'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/shared';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ hasError, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'appearance-none block w-full px-3 py-2 ring-1 rounded-md shadow-sm placeholder-gray-400 focus:outline-none hover:ring-indigo-300 focus:ring-indigo-500 text-sm',
        {
          'ring-red-300': hasError,
          'ring-gray-300': !hasError,
        },
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;

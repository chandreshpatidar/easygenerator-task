'use client';

import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils/shared';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ hasError, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='relative'>
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'appearance-none block w-full px-3 py-2 ring-1 rounded-md shadow-sm placeholder-gray-400 focus:outline-none hover:ring-indigo-300 focus:ring-indigo-500 text-sm pr-10',
          {
            'ring-red-300': hasError,
            'ring-gray-300': !hasError,
          },
          className
        )}
        {...props}
      />
      <button
        type='button'
        className='absolute inset-y-0 right-0 flex items-center px-3'
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;

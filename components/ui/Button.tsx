'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/shared';
import { Loader } from 'lucide-react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-transparent text-gray-800 hover:bg-gray-100 shadow-none',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-md min-h-10',
  large: 'px-6 py-3 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      loading: isLoading = false,
      disabled = false,
      variant = 'default',
      size = 'medium',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg shadow transition duration-200 ease-in-out focus:outline-none border-none',
          {
            'opacity-70 cursor-not-allowed': disabled || isLoading,
            'hover:opacity-80': !disabled && !isLoading,
          },
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader
            className='animate-spin'
            size={16}
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

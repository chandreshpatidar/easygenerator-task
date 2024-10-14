import { cn } from '@/lib/utils/shared';
import React from 'react';

interface ErrorMessageProps {
  error?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
  return <p className={cn('text-sm text-red-400', className)}>{error}</p>;
};

export default ErrorMessage;

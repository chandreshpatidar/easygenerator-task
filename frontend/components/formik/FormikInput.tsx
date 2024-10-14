'use client';

import React from 'react';
import Label from '../ui/Label';
import Input from '../ui/Input';
import ErrorMessage from '../ui/ErrorMessage';
import { Field, FieldProps, ErrorMessage as FormikErrorMessage } from 'formik';

interface FormikInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputElement['type'];
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  placeholder,
  disabled,
  labelClassName,
  inputClassName,
  errorClassName,
  type = 'text',
  autoComplete = 'off',
  maxLength,
  minLength,
  required,
}) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      <Label
        htmlFor={name}
        className={labelClassName}
        required={required}
      >
        {label}
      </Label>

      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <Input
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            hasError={Boolean(form.touched[name] && form.errors[name])}
            type={type}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            {...field}
          />
        )}
      </Field>

      <div className='h-5'>
        <FormikErrorMessage name={name}>
          {(errorMsg) => (
            <ErrorMessage
              error={errorMsg}
              className={errorClassName}
            />
          )}
        </FormikErrorMessage>
      </div>
    </div>
  );
};

FormikInput.displayName = 'FormikInput';
export default FormikInput;

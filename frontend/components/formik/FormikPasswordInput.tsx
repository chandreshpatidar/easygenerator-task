'use client';

import React from 'react';
import Label from '../ui/Label';
import ErrorMessage from '../ui/ErrorMessage';
import { Field, FieldProps, ErrorMessage as FormikErrorMessage } from 'formik';
import PasswordInput from '../ui/PasswordInput';

interface FormikPasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const FormikPasswordInput: React.FC<FormikPasswordInputProps> = ({
  name,
  label,
  placeholder,
  disabled,
  labelClassName,
  inputClassName,
  errorClassName,
  autoComplete = 'off',
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
          <PasswordInput
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            hasError={Boolean(form.touched[name] && form.errors[name])}
            autoComplete={autoComplete}
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

FormikPasswordInput.displayName = 'FormikPasswordInput';
export default FormikPasswordInput;

'use client';

import FormikInput from '@/components/formik/FormikInput';
import { Form, Formik } from 'formik';
import React from 'react';
import { SIGNIN_FORM_FIELDS } from '../constants/signinFormFields';
import { signinFormValidation } from '../validations/formValidations';
import FormikPasswordInput from '@/components/formik/FormikPasswordInput';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface SigninFormProps {
  onSubmit: (values: typeof SIGNIN_FORM_FIELDS) => void;
  apiErrorMessage?: string;
  loading?: boolean;
}

const SigninForm: React.FC<SigninFormProps> = ({ onSubmit, loading, apiErrorMessage }) => {
  return (
    <Formik
      initialValues={SIGNIN_FORM_FIELDS}
      validationSchema={signinFormValidation}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className='flex flex-col gap-4'>
          <FormikInput
            required
            name='email'
            label='Email'
            placeholder='Enter your email'
          />
          <FormikPasswordInput
            required
            name='password'
            label='Password'
            placeholder='Enter your password'
          />

          <div className='w-full flex flex-col mt-4'>
            <ErrorMessage error={apiErrorMessage} />
            <Button
              variant='primary'
              className='mt-2'
              loading={loading}
            >
              Sign In
            </Button>
          </div>

          <p className='text-sm text-gray-500 text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-blue-500 underline underline-offset-2'
            >
              Sign Up
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

SigninForm.displayName = 'SigninForm';
export default SigninForm;

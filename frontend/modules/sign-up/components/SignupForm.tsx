'use client';

import FormikInput from '@/components/formik/FormikInput';
import { Form, Formik } from 'formik';
import React from 'react';
import { SIGNUP_FORM_FIELDS } from '../constants/signupFormFields';
import { signupFormValidation } from '../validations/formValidations';
import FormikPasswordInput from '@/components/formik/FormikPasswordInput';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface SignupFormProps {
  onSubmit: (values: typeof SIGNUP_FORM_FIELDS) => void;
  apiErrorMessage?: string;
  loading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading, apiErrorMessage }) => {
  return (
    <Formik
      initialValues={SIGNUP_FORM_FIELDS}
      validationSchema={signupFormValidation}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className='flex flex-col gap-4'>
          <FormikInput
            required
            name='name'
            label='Name'
            placeholder='Enter your name'
          />
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
              Create Account
            </Button>
          </div>

          <p className='text-sm text-gray-500 text-center'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='text-blue-500 underline underline-offset-2'
            >
              Sign In
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

SignupForm.displayName = 'SignupForm';
export default SignupForm;

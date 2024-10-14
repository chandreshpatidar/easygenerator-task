'use client';

import React, { useState } from 'react';
import SignupForm from './SignupForm';
import { SIGNUP_FORM_FIELDS } from '../constants/signupFormFields';
import { API_URL } from '@/lib/config';
import { useAppContext } from '@/lib/store/AppContext';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [apiCalling, setApiCalling] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const { dispatch } = useAppContext();
  const router = useRouter();

  const handleSignup = async (values: typeof SIGNUP_FORM_FIELDS) => {
    if (apiCalling) {
      return;
    }

    setApiCalling(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data?.user?.id) {
        dispatch({ type: 'SET_USER', payload: data.user });
        router.replace('/');
      } else {
        setApiErrorMessage(data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      setApiErrorMessage((error as Error)?.message || 'Something went wrong');
    } finally {
      setApiCalling(false);
    }
  };

  return (
    <SignupForm
      onSubmit={handleSignup}
      apiErrorMessage={apiErrorMessage}
      apiCalling={apiCalling}
    />
  );
};

Signup.displayName = 'Signup';
export default Signup;

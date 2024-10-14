'use client';

import React, { useState } from 'react';
import { API_URL } from '@/lib/config';
import { useAppContext } from '@/lib/store/AppContext';
import { useRouter } from 'next/navigation';
import { SIGNIN_FORM_FIELDS } from '../constants/signinFormFields';
import SigninForm from './SigninForm';

const Signin = () => {
  const [apiCalling, setApiCalling] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const { dispatch } = useAppContext();
  const router = useRouter();

  const handleSignup = async (values: typeof SIGNIN_FORM_FIELDS) => {
    if (apiCalling) {
      return;
    }

    setApiCalling(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data?.user?._id) {
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
    <SigninForm
      onSubmit={handleSignup}
      apiErrorMessage={apiErrorMessage}
      apiCalling={apiCalling}
    />
  );
};

Signin.displayName = 'Signin';
export default Signin;

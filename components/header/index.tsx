'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { API_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/store/AppContext';

const Header = () => {
  const [apiCalling, setApiCalling] = useState(false);
  const { dispatch } = useAppContext();
  const router = useRouter();

  const logout = async () => {
    if (apiCalling) {
      return;
    }

    setApiCalling(true);

    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: 'POST',
      });

      const data = await res.json();

      if (data?.message) {
        router.replace('/sign-in');
        dispatch({ type: 'RESET_STORE' });
      } else {
        alert(data?.error || 'Logout failed');
      }
    } catch (error) {
      alert((error as Error)?.message || 'Logout failed');
    } finally {
      setApiCalling(false);
    }
  };
  return (
    <div className='fixed top-0 py-4 px-8 bg-white border-b border-gray-200 w-full'>
      <div className='flex justify-end items-center'>
        <Button
          onClick={logout}
          loading={apiCalling}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

Header.displayName = 'Header';
export default Header;

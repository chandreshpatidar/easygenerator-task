'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppContextAction, AppContextProviderProps, AppContextState, AppContextValue } from './types';
import { decodeJwt } from 'jose';
import { User } from '@/lib/types/user';
import Header from '@/components/header';

const initialAppContextState: AppContextState = {
  user: null,
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const appContextReducer = (state: AppContextState, action: AppContextAction): AppContextState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'RESET_STORE':
      return initialAppContextState;

    default:
      return state;
  }
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, token }) => {
  const [state, dispatch] = useReducer(appContextReducer, initialAppContextState);

  const contextValue = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeJwt(token) as User;

      if (decodedToken?._id) {
        dispatch({
          type: 'SET_USER',
          payload: { email: decodedToken?.email, _id: decodedToken?._id, name: decodedToken?.name },
        });
      }
    }
  }, [token]);

  return (
    <AppContext.Provider value={contextValue}>
      {state.user?._id && <Header />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

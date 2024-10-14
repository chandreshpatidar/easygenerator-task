import { User } from '@/lib/types/user';
import { Dispatch } from 'react';

export interface AppContextState {
  user: User | null;
}

export type AppContextAction = { type: 'SET_USER'; payload: User } | { type: 'RESET_STORE' };

export interface AppContextValue {
  state: AppContextState;
  dispatch: Dispatch<AppContextAction>;
}

export type AppContextProviderProps = {
  children: React.ReactNode;
  token?: string;
};

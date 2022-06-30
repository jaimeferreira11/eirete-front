import { IUser } from '@core/interfaces';
import { createContext } from 'react';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

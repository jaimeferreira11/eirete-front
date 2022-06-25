import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

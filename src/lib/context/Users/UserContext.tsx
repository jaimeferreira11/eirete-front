import { createContext } from 'react';

interface ContextProps {
  saveUser: (newUser: any) => Promise<boolean | any>;
}

export const UserContext = createContext({} as ContextProps);

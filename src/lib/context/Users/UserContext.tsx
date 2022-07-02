import { createContext } from 'react';

import { ResultRequest } from '@lib/interfaces';

interface ContextProps {
  saveUser: (newUser: any) => Promise<ResultRequest>;
}

export const UserContext = createContext({} as ContextProps);

/* eslint-disable no-unused-vars */
import { createContext } from 'react';

import { IUser } from '@core/interfaces';
import { ResultRequest } from '@lib/interfaces';

interface ContextProps {
  saveUser: (newUser: any, user?: IUser | undefined) => Promise<ResultRequest>;
  deactivateUser: (id: string) => Promise<ResultRequest>;
}

export const UserContext = createContext({} as ContextProps);

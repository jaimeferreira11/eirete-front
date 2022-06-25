import { useSession } from 'next-auth/react';
import { FC, useEffect, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('data', data);
      dispatch({ type: 'login', payload: data.user as IUser });
    }
  }, [data, status]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

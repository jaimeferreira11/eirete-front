import { IUser } from '@core/interfaces';
import { signOut, useSession } from 'next-auth/react';
import { FC, useEffect, useReducer } from 'react';

import eireteApi from '@core/api';
import { AuthContext, authReducer } from '.';

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
      const user = data.user as IUser;
      eireteApi.defaults.headers.common['x-token'] = user.token;
      dispatch({
        type: 'login',
        payload: user,
      });
    }
  }, [data, status]);

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

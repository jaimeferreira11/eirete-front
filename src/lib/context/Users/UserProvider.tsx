import eireteApi from '@core/api';
import { FC, PropsWithChildren, useReducer } from 'react';
import { UserContext, UserReducer } from '.';

export interface UserState {
  prop: boolean;
}

const User_INITIAL_STATE: UserState = {
  prop: false,
};

export const UserProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, User_INITIAL_STATE);

  const saveUser = async (newUser: any) => {
    await eireteApi.post('/usuarios', newUser);
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        saveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

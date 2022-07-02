import eireteApi from '@core/api';
import axios from 'axios';
import { FC, useReducer } from 'react';
import { UserContext, UserReducer } from '.';

export interface UserState {
  prop: boolean;
}

const User_INITIAL_STATE: UserState = {
  prop: false,
};

interface Props {
  children?: React.ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, User_INITIAL_STATE);

  const saveUser = async (
    newUser: any
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await eireteApi.post('/usuarios', newUser);
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message || '',
        };
      }
      return {
        hasError: true,
        message: 'Something went wrong! 😵‍💫',
      };
    }
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

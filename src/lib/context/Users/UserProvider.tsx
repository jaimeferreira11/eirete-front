import eireteApi from '@core/api';
import { IUser } from '@core/interfaces';
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
    newUser: any,
    user: IUser | undefined
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      if (!user) await eireteApi.post('/usuarios', newUser);
      else await eireteApi.put(`/usuarios/${user._id}`, newUser);

      return {
        hasError: false,
      };
    } catch (error) {
      console.log('error', error);
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

  const deactivateUser = async (
    id: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await eireteApi.put(`/usuarios/change-status/${id}/false`);

      return {
        hasError: false,
      };
    } catch (error) {
      console.log('error', error);
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

  const getByUsername = async (
    username: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await eireteApi.get(`/usuarios/username/${username}`);

      // TODO: donde devuelvo la data?
      return {
        hasError: false,
      };
    } catch (error) {
      console.log('error', error);
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
        deactivateUser,
        getByUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { IUser } from '../../interfaces';
import { AuthState } from './';

type AuthType = { type: 'login'; payload: IUser } | { type: 'logout' };

export const authReducer = (state: AuthState, action: AuthType): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};

import { UserState } from './';

type UserType = { type: 'getUsers' };

export const UserReducer = (state: UserState, action: UserType): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};

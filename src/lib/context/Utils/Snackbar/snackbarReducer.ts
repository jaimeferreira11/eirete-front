import { SnackbarState } from './';

type SnackbarType =
  | { type: 'show'; payload: SnackbarState }
  | { type: 'close' };

export const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarType
): SnackbarState => {
  switch (action.type) {
    case 'show':
      return {
        ...state,
        ...action.payload,
      };
    case 'close':
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

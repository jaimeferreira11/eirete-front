import { SnackbarState } from '.';
import { UtilsState } from './UtilsProvider';

type UtilsType =
  | { type: 'show'; payload: SnackbarState }
  | { type: 'close' }
  | { type: 'showDrawer' }
  | { type: 'closeDrawer' };

export const utilsReducer = (
  state: UtilsState,
  action: UtilsType
): UtilsState => {
  switch (action.type) {
    case 'show':
      return {
        ...state,
        snackBar: { ...action.payload },
      };
    case 'close':
      return {
        ...state,
        snackBar: { ...state.snackBar, show: false },
      };
    case 'closeDrawer':
      return {
        ...state,
        drawer: { show: false },
      };
    case 'showDrawer':
      return {
        ...state,
        drawer: { show: true },
      };
    default:
      return state;
  }
};

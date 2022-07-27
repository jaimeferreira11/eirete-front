import { AlertColor } from '@mui/material';
import { FC, PropsWithChildren, useReducer } from 'react';
import { UtilsContext, utilsReducer } from '.';

export interface SnackbarState {
  message: string;
  type: AlertColor;
  show: boolean;
}
export interface UtilsState {
  snackBar: SnackbarState;
  drawer: { show: boolean };
}

const UTILS_INITIAL_STATE: UtilsState = {
  snackBar: { message: '', show: false, type: 'success' },
  drawer: { show: false },
};

export const UtilsProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(utilsReducer, UTILS_INITIAL_STATE);

  const showSnackbar = (options: SnackbarState) => {
    dispatch({ type: 'show', payload: options });
  };

  const closeSnackbar = () => {
    dispatch({ type: 'close' });
  };

  const closeDrawer = () => dispatch({ type: 'closeDrawer' });
  const showDrawer = () => dispatch({ type: 'showDrawer' });

  return (
    <UtilsContext.Provider
      value={{
        ...state,
        showSnackbar,
        closeSnackbar,
        closeDrawer,
        showDrawer,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

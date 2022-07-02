import { AlertColor } from '@mui/material';
import { FC, PropsWithChildren, useReducer } from 'react';
import { SnackbarContext, snackbarReducer } from './';

export interface SnackbarState {
  message: string;
  type: AlertColor;
  show: boolean;
}

const SNACKBAR_INITIAL_STATE: SnackbarState = {
  message: '',
  show: false,
  type: 'success',
};

export const SnackbarProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, SNACKBAR_INITIAL_STATE);

  const showSnackbar = (options: SnackbarState) => {
    dispatch({ type: 'show', payload: options });
  };

  const closeSnackbar = () => {
    dispatch({ type: 'close' });
  };

  return (
    <SnackbarContext.Provider
      value={{
        ...state,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

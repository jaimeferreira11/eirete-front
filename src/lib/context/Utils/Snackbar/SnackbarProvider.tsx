import { FC, PropsWithChildren, useReducer } from 'react';
import { SnackbarContext, snackbarReducer } from './';

export type SnackbarMessageType = 'success' | 'error' | 'warning' | 'info' | '';

export interface SnackbarState {
  message: string;
  type: SnackbarMessageType;
  show: boolean;
}

const SNACKBAR_INITIAL_STATE: SnackbarState = {
  message: '',
  show: false,
  type: '',
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

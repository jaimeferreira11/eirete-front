import { createContext } from 'react';
import { SnackbarState } from './SnackbarProvider';

interface ContextProps {
  message: string;
  show: boolean;
  type: string;
  showSnackbar: (options: SnackbarState) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext({} as ContextProps);

import { AlertColor } from '@mui/material';
import { createContext } from 'react';
import { SnackbarState } from './SnackbarProvider';

interface ContextProps {
  message: string;
  show: boolean;
  type: AlertColor;
  showSnackbar: (options: SnackbarState) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext({} as ContextProps);

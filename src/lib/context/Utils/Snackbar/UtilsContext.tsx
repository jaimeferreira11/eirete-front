import { AlertColor } from '@mui/material';
import { createContext } from 'react';
import { SnackbarState } from './UtilsProvider';

interface ContextProps {
  snackBar: { message: string; show: boolean; type: AlertColor };
  drawer: { show: boolean };
  showSnackbar: (options: SnackbarState) => void;
  closeSnackbar: () => void;
  showDrawer: () => void;
  closeDrawer: () => void;
}

export const UtilsContext = createContext({} as ContextProps);

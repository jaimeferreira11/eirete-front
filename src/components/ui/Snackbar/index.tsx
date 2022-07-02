import { useSnackbarProvider } from '@lib/hooks';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export const SnackBarEirete = () => {
  const { show, closeSnackbar, message, type } = useSnackbarProvider();
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert
        onClose={closeSnackbar}
        severity={type as AlertColor}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

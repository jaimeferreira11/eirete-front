import { useSnackbarProvider } from '@lib/hooks';
import { Alert, Snackbar } from '@mui/material';

export const SnackBarEirete = () => {
  const { show, closeSnackbar, message, type } = useSnackbarProvider();
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

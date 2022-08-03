import { useUtilsProvider } from '@lib/hooks';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export const SnackBarEirete = () => {
  const { snackBar, closeSnackbar } = useUtilsProvider();
  return (
    <Snackbar
      open={snackBar.show}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackBar.type as AlertColor}
        sx={{ width: '100%' }}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  );
};

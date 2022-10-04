import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

// const useStyles = makeStyles((theme) => ({
//   dialogPaper: {
//     padding: 20,
//     minWidth: 420,
//   },
//   alertButton: {
//     borderRadius: 60,
//     backgroundColor: 'rgb(207, 0, 0)',
//     border: '1px solid rgb(207, 0, 0)',
//     minWidth: 120,
//     '&:hover': {
//       backgroundColor: 'rgb(150, 0, 0)',
//     },
//   },
//   alertButtonText: {
//     textTransform: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   primaryButton: {
//     borderRadius: 60,
//     backgroundColor: '#081D42',
//     border: '1px solid #081D42',
//     minWidth: 120,
//   },
//   primaryButtonText: {
//     textTransform: 'none',
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   secondaryButton: {
//     borderRadius: 60,
//     backgroundColor: '#FDFDFD',
//     border: '1px solid rgba(0, 0, 0, 0.12)',
//     minWidth: 120,
//   },
//   secondaryButtonText: {
//     textTransform: 'none',
//     color: '#464646',
//     fontWeight: 'bold',
//   },
//   title: {
//     color: '#464646',
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 16,
//     paddingTop: 0,
//     fontFamily: theme.typography.fontFamily,
//     fontWeight: 'bold',
//   },
//   content: {
//     color: '#464646',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   contentPre: {
//     whiteSpace: 'pre-wrap',
//     textAlign: 'left',
//   },
//   iconSpacing: {
//     color: '#081D42',
//     alignSelf: 'center',
//     width: 70,
//     height: 70,
//     marginTop: 10,
//     marginBottom: 16,
//   },
//   successIcon: {
//     color: '#75B67C',
//   },
//   warnIcon: {
//     color: '#081D42',
//   },
//   helpIcon: {
//     color: '#081D42',
//   },
//   errorIcon: {
//     color: 'rgb(207, 0, 0)',
//   },
// }));

interface Props {
  onAccept: () => void;
  onCancel: () => void;
  message: string;
  title: string;
  open: boolean;
  children?: React.ReactNode;
}

const ModalConfirmation: FC<Props> = ({
  open,
  onCancel,
  message,
  title,
  onAccept,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'modal' });
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCancel} sx={{ py: 1, px: 2 }}>
          {t('cancel')}
        </Button>
        <Button
          color="success"
          sx={{ py: 1, px: 2 }}
          onClick={onAccept}
          autoFocus
        >
          {t('ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmation;

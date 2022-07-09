import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { ISucursal } from '@core/interfaces';

import { useSnackbarProvider, useSucuralesProvider } from '@lib/hooks';
import { INewSucursal } from '@lib/interfaces';
import { useSucursalForm } from './useSucursalForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  sucursal?: ISucursal;
}

export const SucursalDialog: FC<Props> = ({
  open,
  handleClose,
  sucursal = undefined,
}) => {
  const { t } = useTranslation('sucursalesABM');
  const { save } = useSucuralesProvider();
  const { showSnackbar } = useSnackbarProvider();

  const title = sucursal ? t('editUser') : t('newSucursal');

  const { form, handleSubmit } = useSucursalForm({ sucursal });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newSucursal: INewSucursal) => {
    setIsSaving(true);
    const result = await save(newSucursal);
    if (!result.hasError) {
      showSnackbar({
        message: t('sucursalPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('sucursalPersistError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root': {
          padding: 2,
        },
        '& .MuiDialogActions-root': {
          padding: 1,
        },
      }}
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ maxHeight: '450px' }}>{form}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSaving}>
            <Typography>{t('form.cancel')}</Typography>
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <CircularProgress size="25px" color="info" />
            ) : (
              <Typography>{t('form.save')}</Typography>
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

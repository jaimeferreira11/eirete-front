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

import { ICaja } from '@core/interfaces';

import { useCajasProvider, useUtilsProvider } from '@lib/hooks';
import { INewCaja } from '@lib/interfaces';
import { useCajaForm } from './useCajaForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  caja?: ICaja;
}

export const CajaDialog: FC<Props> = ({
  open,
  handleClose,
  caja = undefined,
}) => {
  const { t } = useTranslation('cajasABM');
  const { save } = useCajasProvider();
  const { showSnackbar } = useUtilsProvider();

  const title = caja ? t('editCaja') : t('newCaja');

  const { form, handleSubmit } = useCajaForm({ caja });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newCaja: INewCaja) => {
    const newCajaCrud = {
      ...newCaja,
      sucursal: { _id: newCaja.sucursal },
    };
    setIsSaving(true);
    const result = await save(newCajaCrud);
    if (!result.hasError) {
      showSnackbar({
        message: t('cajaPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('cajaPersistError'),
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

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
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const title = sucursal ? t('editUser') : t('newSucursal');

  const { form, handleSubmit } = useSucursalForm({ sucursal });

  const [isSaving, setIsSaving] = useState(false);

  // TODO CAMBIAR CIUDADES PARA OBTENER DE BD

  const ciudades = [
    {
      _id: '1',
      descripcion: 'Asunción',
    },
    {
      _id: '2',
      descripcion: 'Luque',
    },
    {
      _id: '3',
      descripcion: 'Capiata',
    },
  ];

  const onSubmit = (values) => {
    console.log('values', values);
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
          <Button onClick={handleClose}>
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

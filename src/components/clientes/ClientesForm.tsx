import { FC, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { ICliente } from '@core/interfaces';

import { useClienteProvider, useSnackbarProvider } from '@lib/hooks';
import { INewPersona } from '@lib/interfaces/NewCliente';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  cliente?: ICliente;
}

export const ClientesForm: FC<Props> = ({
  open,
  handleClose,
  cliente = undefined,
}) => {
  const { saveCliente } = useClienteProvider();
  const { showSnackbar } = useSnackbarProvider();
  const { t } = useTranslation('clientesABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  console.log('cliente', cliente);
  const title = cliente ? t('editCliente') : t('newCliente');

  const persona: INewPersona = cliente
    ? {
        ...cliente.persona,
      }
    : {
        nombreApellido: '',
        nroDoc: '',
        sexo: '',
        tipoDoc: '',
        tipoPersona: '',
      };

  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewPersona>();

  const onSubmit = async (newPersona: INewPersona) => {
    setIsSaving(true);
    const result = await saveCliente(newPersona, cliente);

    if (!result.hasError) {
      showSnackbar({
        message: !cliente ? t('clientePersist') : t('clienteUpdated'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('clientePersistError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  };

  useEffect(() => {
    reset();
  }, [open, reset]);

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
        <DialogContent style={{ maxHeight: '450px' }}>
          <Grid spacing={3} container sx={{ px: 1, mt: 1 }}>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="nombreApellido"
                defaultValue={persona?.nombreApellido}
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    label={t('form.nombreApellido')}
                    fullWidth
                    {...field}
                    inputProps={{
                      autoComplete: 'nombreApellido',
                      form: {
                        autoComplete: 'off',
                      },
                      style: { textTransform: 'uppercase' },
                    }}
                    error={!!errors.nombreApellido}
                    helperText={errors.nombreApellido?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="sexo"
                defaultValue={persona?.sexo || 'F'}
                rules={{
                  required: tForm('required'),
                }}
                render={({ field }) => (
                  <TextField
                    select
                    label={t('form.sexo')}
                    fullWidth
                    {...field}
                    error={!!errors.sexo}
                    helperText={errors.sexo?.message}
                  >
                    <MenuItem key={'F'} value={'F'}>
                      {t('form.sexOptions.femenino')}
                    </MenuItem>
                    <MenuItem key={'M'} value={'M'}>
                      {t('form.sexOptions.masculino')}
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid xs={6} item>
              <Controller
                control={control}
                name="tipoDoc"
                defaultValue={persona?.tipoDoc}
                rules={{
                  required: tForm('required'),
                }}
                render={({ field }) => (
                  <TextField
                    select
                    label={t('form.tipoDoc')}
                    fullWidth
                    {...field}
                    error={!!errors.tipoDoc}
                    helperText={errors.tipoDoc?.message}
                  >
                    <MenuItem key={'CI'} value={'CI'}>
                      {t('form.tipoDocOptions.ci')}
                    </MenuItem>
                    <MenuItem key={'RUC'} value={'RUC'}>
                      {t('form.tipoDocOptions.ruc')}
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="nroDoc"
                defaultValue={persona?.nroDoc}
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    label={t('form.nroDoc')}
                    fullWidth
                    {...field}
                    inputProps={{
                      autoComplete: 'nroDoc',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                    error={!!errors.nroDoc}
                    helperText={errors.nroDoc?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
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

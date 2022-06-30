import { FC, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Box,
  Button,
  Chip,
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

import { IUser } from '@core/interfaces';
import { INewUser } from '@lib/interfaces/NewUser';

import {
  usePerfil,
  useSnackbarProvider,
  useSucursal,
  useUserProvider,
} from '@lib/hooks';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  usuario?: IUser;
}

export const UsuarioForm: FC<Props> = ({
  open,
  handleClose,
  usuario = undefined,
}) => {
  const { saveUser } = useUserProvider();
  const { showSnackbar } = useSnackbarProvider();
  const { t } = useTranslation('usersABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const title = usuario ? t('ediUser') : t('newUser');

  const [isSaving, setIsSaving] = useState(false);

  const { sucursales } = useSucursal();
  const { perfiles } = usePerfil();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewUser>();

  const onSubmit = async (newUser: INewUser) => {
    const newUserCrud = {
      ...newUser,
      perfiles: newUser.perfiles.map((perfil) => ({ _id: perfil })),
      sucursal: { _id: newUser.sucursal },
    };

    try {
      setIsSaving(true);
      await saveUser(newUserCrud);
      showSnackbar({
        message: t('usuarioPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } catch (error) {
      console.log(error);
      showSnackbar({
        message: t('usuarioPersistError'),
        type: 'error',
        show: true,
      });
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
              <TextField
                inputProps={{
                  autoComplete: 'username',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                label={t('form.username')}
                fullWidth
                {...register('username', {
                  required: tForm('required'),
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                inputProps={{
                  autoComplete: 'nombreApellido',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                label={t('form.nombreApellido')}
                fullWidth
                {...register('nombreApellido', {
                  required: tForm('required'),
                  minLength: {
                    value: 6,
                    message: tForm('minLengthField', { cantidad: 6 }),
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                rules={{ required: tForm('required') }}
                name="perfiles"
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      label={t('form.perfiles')}
                      fullWidth
                      {...field}
                      value={field.value || []}
                      error={!!errors.perfiles}
                      helperText={errors.perfiles?.message}
                      defaultValue={[]}
                      SelectProps={{
                        multiple: true,
                        native: false,
                        renderValue: (selected: any) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.length === 0 ? (
                              <Typography>Seleccione un perfil</Typography>
                            ) : (
                              selected?.map((value: any) => (
                                <Chip
                                  key={value}
                                  label={
                                    perfiles?.find((p) => p._id === value)
                                      ?.descripcion
                                  }
                                />
                              ))
                            )}
                          </Box>
                        ),
                      }}
                    >
                      {perfiles?.map((perfil) => (
                        <MenuItem key={perfil._id} value={perfil._id}>
                          {perfil.descripcion}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                select
                inputProps={{
                  autoComplete: 'sucursal',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                label={t('form.sucursal')}
                fullWidth
                {...register('sucursal', {
                  required: tForm('required'),
                })}
                error={!!errors.sucursal}
                helperText={errors.sucursal?.message}
                defaultValue=""
              >
                {sucursales?.map((sucursal) => (
                  <MenuItem key={sucursal._id} value={sucursal._id}>
                    {sucursal.descripcion}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                inputProps={{
                  autoComplete: 'password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                type="password"
                label={t('form.password')}
                fullWidth
                {...register('password', {
                  required: tForm('required'),
                  minLength: {
                    value: 6,
                    message: tForm('minLengthField', { cantidad: 6 }),
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
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

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

import {
  usePerfil,
  useSnackbarProvider,
  useSucursal,
  useUserProvider,
} from '@lib/hooks';
import { INewUser } from '@lib/interfaces';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  user?: IUser;
}

export const UsuarioForm: FC<Props> = ({
  open,
  handleClose,
  user = undefined,
}) => {
  const { saveUser } = useUserProvider();
  const { showSnackbar } = useSnackbarProvider();
  const { t } = useTranslation('usersABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const title = user ? t('editUser') : t('newUser');

  const initialData = user
    ? {
        username: user?.username,
        nombreApellido: user?.nombreApellido,
        perfiles: user.perfiles.map((perfil) => perfil._id),
        sucursal: user.sucursal._id,
      }
    : {
        username: '',
        nombreApellido: '',
        perfiles: [],
        sucursal: '',
      };

  const [isSaving, setIsSaving] = useState(false);

  const { sucursales } = useSucursal();
  const { perfiles } = usePerfil();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewUser>();

  const onSubmit = async (newUser: INewUser) => {
    const newUserCrud = {
      ...newUser,
      perfiles: newUser.perfiles.map((perfil) => ({ _id: perfil })),
      sucursal: { _id: newUser.sucursal },
    };

    setIsSaving(true);
    const result = await saveUser(newUserCrud, user);

    if (!result.hasError) {
      showSnackbar({
        message: !user ? t('usuarioPersist') : t('usuarioUpdated'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('usuarioPersistError'),
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
                name="username"
                defaultValue={initialData?.username}
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    label={t('form.username')}
                    fullWidth
                    {...field}
                    inputProps={{
                      autoComplete: 'username',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                    disabled={user !== undefined}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="nombreApellido"
                defaultValue={initialData?.nombreApellido}
                rules={{
                  required: tForm('required'),
                  minLength: {
                    value: 6,
                    message: tForm('minLengthField', { cantidad: 6 }),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label={t('form.nombreApellido')}
                    fullWidth
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="perfiles"
                defaultValue={initialData?.perfiles}
                rules={{ required: tForm('required') }}
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
              <Controller
                control={control}
                name="sucursal"
                defaultValue={initialData?.sucursal}
                rules={{
                  required: tForm('required'),
                }}
                render={({ field }) => (
                  <TextField
                    select
                    label={t('form.sucursal')}
                    fullWidth
                    {...field}
                    error={!!errors.sucursal}
                    helperText={errors.sucursal?.message}
                  >
                    {sucursales?.map((sucursal) => (
                      <MenuItem key={sucursal._id} value={sucursal._id}>
                        {sucursal.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: !user ? tForm('required') : false,
                  minLength: {
                    value: 6,
                    message: tForm('minLengthField', { cantidad: 6 }),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    label={t('form.password')}
                    fullWidth
                    {...field}
                    inputProps={{
                      autoComplete: 'password',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="passwordConfirmation"
                defaultValue=""
                rules={{
                  required: !user ? tForm('required') : false,
                  validate: {
                    confirmPassword: (value) =>
                      value === getValues().password ||
                      t('form.confirmPasswordError'),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    label={t('form.passwordConfirmation')}
                    fullWidth
                    {...field}
                    inputProps={{
                      autoComplete: 'passwordConfirmation',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                  />
                )}
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

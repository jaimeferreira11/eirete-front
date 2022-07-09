import { FC } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Grid, MenuItem, TextField } from '@mui/material';

import { ISucursal } from '@core/interfaces';

import { useSnackbarProvider, useSucuralesProvider } from '@lib/hooks';
import { INewSucursal } from '@lib/interfaces/NewSucursal';

interface Props {
  children?: React.ReactNode;
  sucursal?: ISucursal;
}

export const SucursalForm: FC<Props> = ({ sucursal = undefined }) => {
  const { t } = useTranslation('sucursalesABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });
  const { save } = useSucuralesProvider();
  const { showSnackbar } = useSnackbarProvider();

  const initialData: INewSucursal = sucursal
    ? {
        ciudad: sucursal?.ciudad,
        descripcion: sucursal.descripcion,
        direccion: sucursal.direccion,
        establecimiento: sucursal.establecimiento,
        timbrado: sucursal.timbrado,
        rangoInicial: sucursal.rangoInicial,
        rangoFinal: sucursal.rangoInicial,
        puntoExpedicion: sucursal.puntoExpedicion,
      }
    : {
        ciudad: '',
        descripcion: '',
        direccion: '',
        establecimiento: 0,
        timbrado: 0,
        rangoInicial: 1,
        rangoFinal: 9999999,
        puntoExpedicion: 1,
      }; 

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

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewSucursal>();

  const onSubmit = async (newSucursal: INewSucursal) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid spacing={3} container sx={{ px: 1, mt: 0.2 }}>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="descripcion"
            defaultValue={initialData?.descripcion}
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.descripcion')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'descripcion',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                disabled={sucursal !== undefined}
                error={!!errors.descripcion}
                helperText={errors.descripcion?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="direccion"
            defaultValue={initialData?.direccion}
            rules={{
              required: tForm('required'),
              minLength: {
                value: 6,
                message: tForm('minLengthField', { cantidad: 6 }),
              },
            }}
            render={({ field }) => (
              <TextField
                label={t('form.direccion')}
                fullWidth
                {...field}
                error={!!errors.direccion}
                helperText={errors.direccion?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="ciudad"
            defaultValue={initialData?.ciudad}
            rules={{ required: tForm('required') }}
            render={({ field }) => {
              return (
                <TextField
                  select
                  label={t('form.ciudad')}
                  fullWidth
                  {...field}
                  error={!!errors.ciudad}
                  helperText={errors.ciudad?.message}
                >
                  {ciudades?.map((ciudad) => (
                    <MenuItem key={ciudad._id} value={ciudad._id}>
                      {ciudad.descripcion}
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
            name="timbrado"
            defaultValue={initialData?.timbrado}
            rules={{
              required: tForm('required'),
              minLength: {
                value: 8,
                message: tForm('minLengthField', { cantidad: 8 }),
              },
            }}
            render={({ field }) => (
              <TextField
                label={t('form.timbrado')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'timbrado',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                error={!!errors.timbrado}
                helperText={errors.timbrado?.message}
              />
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="establecimiento"
            defaultValue={initialData?.establecimiento}
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.establecimiento')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'establecimiento',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                error={!!errors.establecimiento}
                helperText={errors.establecimiento?.message}
              />
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="puntoExpedicion"
            defaultValue={initialData?.puntoExpedicion}
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.puntoExpedicion')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'puntoExpedicion',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                error={!!errors.puntoExpedicion}
                helperText={errors.puntoExpedicion?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="rangoInicial"
            defaultValue={initialData?.puntoExpedicion}
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.rangoInicial')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'rangoInicial',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                error={!!errors.rangoInicial}
                helperText={errors.rangoInicial?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="rangoFinal"
            defaultValue={initialData?.puntoExpedicion}
            rules={{
              required: tForm('required'),
              maxLength: {
                value: 7,
                message: tForm('minLengthField', { cantidad: 7 }),
              },
              minLength: {
                value: 7,
                message: tForm('minLengthField', { cantidad: 7 }),
              },
            }}
            render={({ field }) => (
              <TextField
                label={t('form.rangoFinal')}
                fullWidth
                {...field}
                inputProps={{
                  autoComplete: 'rangoFinal',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                error={!!errors.rangoFinal}
                helperText={errors.rangoFinal?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Button, Grid, MenuItem, TextField } from '@mui/material';

import { ISucursal } from '@core/interfaces';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { INewSucursal } from '@lib/interfaces/NewSucursal';

interface Props {
  sucursal?: ISucursal;
}

export const useSucursalForm = ({ sucursal = undefined }: Props) => {
  const { t } = useTranslation('sucursalesABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData: INewSucursal = useMemo(() => {
    return sucursal
      ? {
          ciudad: sucursal?.ciudad,
          descripcion: sucursal.descripcion,
          direccion: sucursal.direccion,
          establecimiento: sucursal.establecimiento,
          timbrado: sucursal.timbrado,
          rangoInicial: sucursal.rangoInicial,
          rangoFinal: sucursal.rangoFinal,
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
  }, [sucursal]);

  const [disabled, setDisabled] = useState(sucursal ? true : false);

  // TODO CAMBIAR CIUDADES PARA OBTENER DE BD

  const ciudades = [
    {
      _id: 'Asuncion',
      descripcion: 'Asunción',
    },
    {
      _id: 'LUQ',
      descripcion: 'Luque',
    },
    {
      _id: '3',
      descripcion: 'Capiata',
    },
    {
      _id: 'MRA',
      descripcion: 'Mariano',
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewSucursal>({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return {
    control,
    handleSubmit,
    reset,
    getValues,
    disabled,
    form: (
      <Grid spacing={3} container sx={{ px: 1, mt: 0.2 }}>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="descripcion"
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.descripcion')}
                fullWidth
                {...field}
                inputProps={{}}
                error={!!errors.descripcion}
                helperText={errors.descripcion?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="direccion"
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
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="ciudad"
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
                  disabled={disabled}
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
                inputProps={{}}
                error={!!errors.timbrado}
                helperText={errors.timbrado?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="establecimiento"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.establecimiento')}
                fullWidth
                {...field}
                inputProps={{}}
                error={!!errors.establecimiento}
                helperText={errors.establecimiento?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="puntoExpedicion"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.puntoExpedicion')}
                fullWidth
                {...field}
                inputProps={{}}
                error={!!errors.puntoExpedicion}
                helperText={errors.puntoExpedicion?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="rangoInicial"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                label={t('form.rangoInicial')}
                fullWidth
                {...field}
                inputProps={{}}
                error={!!errors.rangoInicial}
                helperText={errors.rangoInicial?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="rangoFinal"
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
                inputProps={{}}
                error={!!errors.rangoFinal}
                helperText={errors.rangoFinal?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>
        {sucursal && (
          <Grid xs={6} item>
            <Button
              color="inherit"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setDisabled(false)}
            >
              {t('editData')}
            </Button>
          </Grid>
        )}
      </Grid>
    ),
  };
};

import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';

import { ICiudad, ISucursal } from '@core/interfaces';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useCiudades } from '@lib/hooks';
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
          ciudad: sucursal.ciudad,
          descripcion: sucursal.descripcion,
          direccion: sucursal.direccion,
          establecimiento: sucursal.establecimiento,
          timbrado: sucursal.timbrado,
          rangoInicial: sucursal.rangoInicial,
          rangoFinal: sucursal.rangoFinal,
          puntoExpedicion: sucursal.puntoExpedicion,
          estado: sucursal.estado,
        }
      : {
          ciudad: '',
          descripcion: '',
          direccion: '',
          // establecimiento: 0,
          // timbrado: 0,
          rangoInicial: 1,
          rangoFinal: 9999999,
          puntoExpedicion: 1,
          estado: true,
        };
  }, [sucursal]);

  const [disabled, setDisabled] = useState(sucursal ? true : false);

  const { ciudades } = useCiudades();
  const [ciudadAux, setCiudadAux] = useState<ICiudad | null | undefined>(null);

  useEffect(() => {
    if (sucursal)
      setCiudadAux(
        ciudades
          ? ciudades?.find((ciudad) => ciudad.descripcion === sucursal.ciudad)
          : null
      );
    else setCiudadAux(null);
  }, [ciudades, sucursal]);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewSucursal>({
    defaultValues: {
      ...initialData,
    },
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
                inputProps={{ style: { textTransform: 'uppercase' } }}
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
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <Autocomplete
                  disabled={disabled}
                  options={ciudades || []}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  getOptionLabel={(option) => option.descripcion}
                  onChange={(_, data) => {
                    setCiudadAux(data);
                    onChange(data?.descripcion);
                  }}
                  value={ciudadAux}
                  renderInput={(params) => (
                    <TextField
                      label={t('form.ciudad')}
                      {...params}
                      {...field}
                      inputRef={ref}
                      fullWidth
                      error={!!errors.ciudad}
                      helperText={errors.ciudad?.message}
                      disabled={disabled}
                    />
                  )}
                />
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
                type="number"
                {...field}
                inputProps={{ maxLength: 8 }}
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
        <Grid xs={6} item>
          <FormControlLabel
            value={initialData?.estado || false}
            control={
              <Controller
                name={'estado'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Switch
                    {...field}
                    ref={ref}
                    checked={field.value}
                    onChange={(e, value) => onChange(value)}
                    disabled={disabled}
                  />
                )}
              />
            }
            disabled={disabled}
            label={t('form.estado')}
          />
        </Grid>
      </Grid>
    ),
  };
};

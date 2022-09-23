import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { ICaja } from '@core/interfaces/caja';
import { useSucursal } from '@lib/hooks';

interface Props {
  caja?: ICaja;
}

export const useCajaForm = ({ caja = undefined }: Props) => {
  const { t } = useTranslation('cajasABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData = useMemo(() => {
    return caja
      ? {
          descripcion: caja.descripcion,
          nro: caja.nro,
          sucursal: caja.sucursal._id,
          estado: caja.estado,
        }
      : {
          descripcion: '',
          sucursal: '',
          nro: 0,
          estado: true,
        };
  }, [caja]);

  const { sucursales } = useSucursal();
  const [disabled, setDisabled] = useState(caja ? true : false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, []);

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
        <Grid xs={2} item>
          <Controller
            control={control}
            name="nro"
            render={({ field }) => (
              <TextField
                label={t('form.nro')}
                size="small"
                fullWidth
                {...field}
                error={!!errors.nro}
                helperText={errors.nro?.message}
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid xs={5} item>
          <Controller
            control={control}
            name="descripcion"
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.descripcion')}
                size="small"
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
        <Grid xs={5} item>
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
                size="small"
                label={t('form.sucursal')}
                fullWidth
                {...field}
                disabled={disabled}
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

        {caja && (
          <Grid xs={6} item>
            <Button
              variant="outlined"
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

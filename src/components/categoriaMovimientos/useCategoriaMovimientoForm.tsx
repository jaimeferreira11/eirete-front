import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { ICategoriaMovimiento } from '@core/interfaces';

interface Props {
  categoria?: ICategoriaMovimiento;
}

export const useCategoriaMovimientoForm = ({
  categoria = undefined,
}: Props) => {
  const { t } = useTranslation('categoriaMovimientosABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData = useMemo(() => {
    return categoria
      ? {
          descripcion: categoria.descripcion,
          esGasto: categoria.esGasto,
          esIngreso: categoria.esIngreso,
          visibleCaja: categoria.visibleCaja,
          afectaArqueo: categoria.afectaArqueo,
          afectaEstadistica: categoria.afectaEstadistica,
          estado: categoria.estado,
        }
      : {
          descripcion: '',
          esGasto: true,
          esIngreso: false,
          visibleCaja: false,
          afectaArqueo: false,
          afectaEstadistica: false,
          estado: true,
        };
  }, [categoria]);

  const [disabled, setDisabled] = useState(categoria ? true : false);

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
        <Grid xs={12} item>
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

        <Grid xs={12} item>
          <FormControlLabel
            value={initialData?.esGasto || false}
            control={
              <Controller
                name={'esGasto'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Checkbox
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
            label={t('form.esGasto')}
          />
          <br></br>
          <FormControlLabel
            value={initialData?.esIngreso || false}
            control={
              <Controller
                name={'esIngreso'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Checkbox
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
            label={t('form.esIngreso')}
          />
          <br></br>
          <FormControlLabel
            value={initialData?.visibleCaja || false}
            control={
              <Controller
                name={'visibleCaja'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Checkbox
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
            label={t('form.visibleCaja')}
          />
          <br></br>
          <FormControlLabel
            value={initialData?.afectaArqueo || false}
            control={
              <Controller
                name={'afectaArqueo'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Checkbox
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
            label={t('form.afectaArqueo')}
          />
          <br></br>
          <FormControlLabel
            value={initialData?.afectaEstadistica || false}
            control={
              <Controller
                name={'afectaEstadistica'}
                control={control}
                render={({ field: { ref, onChange, ...field } }) => (
                  <Checkbox
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
            label={t('form.afectaEstadistica')}
          />
        </Grid>

        {categoria && (
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

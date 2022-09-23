import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from '@mui/material';

import {
  IArticulo,
  ILineaArticulo,
  TipoImpuestoArray,
  UnidadMedida,
  UnidadMedidaArray,
} from '@core/interfaces';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useLinea } from '@lib/hooks';
import { INewArticulo } from '@lib/interfaces';
import NumberFormat from 'react-number-format';

interface Props {
  articulo?: IArticulo | undefined;
}

export const useArticuloForm = ({ articulo = undefined }: Props) => {
  const { t } = useTranslation('articulosABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const { lineas } = useLinea();
  const [lineaValue, setLineaValue] = useState<
    ILineaArticulo | null | undefined
  >(null);

  useEffect(() => {
    if (articulo)
      setLineaValue(
        lineas
          ? lineas?.find(
              (linea: ILineaArticulo) =>
                linea._id === articulo.lineaArticulo._id
            )
          : null
      );
    else setLineaValue(null);
  }, [articulo, lineas]);

  const initialData: INewArticulo = useMemo(() => {
    return articulo
      ? {
          codigo: articulo.codigo,
          codigoBarra: articulo.codigoBarra,
          descripcion: articulo.descripcion,
          estado: articulo.estado,
          tipoImpuesto: articulo.tipoImpuesto,
          unidadMedida: articulo.unidadMedida,
          lineaArticulo: articulo.lineaArticulo._id,
          precioVenta: articulo.precioVenta,
        }
      : {
          descripcion: '',
          codigoBarra: '',
          codigo: 0,
          unidadMedida: 'UNIDAD',
          precioVenta: 0,
          lineaArticulo: '',
          tipoImpuesto: 10,
          estado: true,
        };
  }, [articulo]);

  const [unidadMedidaValue, setUnidadMedidaValue] =
    useState<UnidadMedida>('UNIDAD');

  const [disabled, setDisabled] = useState(articulo ? true : false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewArticulo>({
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
            name="codigo"
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.codigo')}
                fullWidth
                {...field}
                inputProps={{ style: { textTransform: 'uppercase' } }}
                error={!!errors.codigo}
                helperText={errors.codigo?.message}
                disabled={true}
              />
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="codigoBarra"
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.codigoBarra')}
                fullWidth
                {...field}
                inputProps={{ style: { textTransform: 'uppercase' } }}
                error={!!errors.codigoBarra}
                helperText={errors.codigoBarra?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

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
            name="lineaArticulo"
            rules={{ required: tForm('required') }}
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <Autocomplete
                  disabled={disabled}
                  options={lineas || []}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  getOptionLabel={(option) => option.descripcion}
                  onChange={(_, data) => {
                    setLineaValue(data);
                    onChange(data?._id);
                  }}
                  value={lineaValue}
                  renderInput={(params) => (
                    <TextField
                      label={t('form.lineaArticulo')}
                      {...params}
                      {...field}
                      inputRef={ref}
                      fullWidth
                      error={!!errors.lineaArticulo}
                      helperText={errors.lineaArticulo?.message}
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
            name="precioVenta"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              // <TextField
              //   label={t('form.precioVenta')}
              //   fullWidth
              //   {...field}
              //   error={!!errors.precioVenta}
              //   helperText={errors.precioVenta?.message}
              //   disabled={disabled}
              // />
              <NumberFormat
                label={t('form.precioVenta')}
                fullWidth
                {...field}
                error={!!errors.precioVenta}
                helperText={errors.precioVenta?.message}
                disabled={disabled}
                displayType={'input'}
                customInput={TextField}
                thousandSeparator={'.'}
                decimalSeparator={','}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="unidadMedida"
            rules={{ required: tForm('required') }}
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <Autocomplete
                  disabled={disabled}
                  options={UnidadMedidaArray}
                  onChange={(_, data) => {
                    setUnidadMedidaValue(data as UnidadMedida);
                    onChange(data);
                  }}
                  value={field.value}
                  renderInput={(params) => (
                    <TextField
                      label={t('form.unidadMedida')}
                      {...params}
                      {...field}
                      inputRef={ref}
                      fullWidth
                      error={!!errors.unidadMedida}
                      helperText={errors.unidadMedida?.message}
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
            name="tipoImpuesto"
            defaultValue={initialData?.tipoImpuesto || 0}
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <TextField
                select
                label={t('form.tipoImpuesto')}
                fullWidth
                {...field}
                error={!!errors.tipoImpuesto}
                helperText={errors.tipoImpuesto?.message}
                disabled={disabled}
              >
                {TipoImpuestoArray.map((tipoImpuesto) => (
                  <MenuItem key={tipoImpuesto.valor} value={tipoImpuesto.valor}>
                    {tipoImpuesto.descripcion}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {articulo && (
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

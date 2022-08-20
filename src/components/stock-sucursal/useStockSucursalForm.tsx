import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import { Button, Grid, TextField } from '@mui/material';

import { IStockArticuloSucursal } from '@core/interfaces';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { INewArticuloStock } from '@lib/interfaces/NewArticuloStock';
import NumberFormat from 'react-number-format';

interface Props {
  articuloStock?: IStockArticuloSucursal | undefined;
  sucursalId: string;
}

export const useStockSucursalForm = ({
  articuloStock = undefined,
  sucursalId = '',
}: Props) => {
  const { t } = useTranslation('stockSucursalABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData: INewArticuloStock = useMemo(() => {
    return articuloStock
      ? {
          codigo: articuloStock.articulo.codigo,
          codigoBarra: articuloStock.articulo.codigoBarra,
          descripcion: articuloStock.articulo.descripcion,
          precioVenta: articuloStock.articulo.precioVenta,
          estado: articuloStock.estado,
          stock: articuloStock.stock,
          articulo: articuloStock.articulo._id,
          stockBloqueado: articuloStock.stockBloqueado,
          stockMinimo: articuloStock.stockMinimo,
        }
      : {
          descripcion: '',
          codigoBarra: '',
          codigo: 0,
          stock: 0,
          precioVenta: 0,
          estado: true,
          articulo: '',
          stockBloqueado: 0,
          stockMinimo: 0,
        };
  }, [articuloStock]);

  const [disabled, setDisabled] = useState(articuloStock ? true : false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewArticuloStock>({
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
                disabled={true}
              />
            )}
          />
        </Grid>

        <Grid xs={12} item>
          <Controller
            control={control}
            name="descripcion"
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                label={t('form.articulo')}
                fullWidth
                {...field}
                inputProps={{ style: { textTransform: 'uppercase' } }}
                error={!!errors.descripcion}
                helperText={errors.descripcion?.message}
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid xs={6} item>
          <Controller
            control={control}
            name="stock"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <NumberFormat
                label={t('form.stock')}
                fullWidth
                {...field}
                error={!!errors.stock}
                helperText={errors.stock?.message}
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
            name="precioVenta"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <NumberFormat
                label={t('form.precioVenta')}
                fullWidth
                {...field}
                error={!!errors.precioVenta}
                helperText={errors.precioVenta?.message}
                disabled={true}
                displayType={'input'}
                customInput={TextField}
                thousandSeparator={'.'}
                decimalSeparator={','}
              />
            )}
          />
        </Grid>

        {articuloStock && (
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

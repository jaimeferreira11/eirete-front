import { ICategoriaMovimiento, IMovimiento } from '@core/interfaces';
import { useCategoriaMovimientos } from '@lib/hooks';
import { INewMovimiento } from '@lib/interfaces';
import { Grid, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface Props {
  movimiento?: IMovimiento;
  tipo: 'ingresos' | 'egresos';
}

export const useMovimientoForm = ({ movimiento = undefined, tipo }: Props) => {
  const { t } = useTranslation('movimientosABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData: INewMovimiento = useMemo(() => {
    return movimiento
      ? {
          descripcion: movimiento.descripcion,
          monto: movimiento.monto,
          categoria: movimiento.categoria._id,
          esGasto: movimiento.esGasto,
          esIngreso: movimiento.esIngreso,
        }
      : {
          descripcion: '',
          monto: 0,
          categoria: '',
          esGasto: true,
          esIngreso: false,
        };
  }, [movimiento]);

  const [disabled, setDisabled] = useState(movimiento ? true : false);

  const { categorias } = useCategoriaMovimientos({ tipo });
  const [categoriaValue, setCategoriaValue] = useState<
    ICategoriaMovimiento | null | undefined
  >(null);

  useEffect(() => {
    if (movimiento)
      setCategoriaValue(
        categorias
          ? categorias?.find(
              (linea: ICategoriaMovimiento) =>
                linea._id === movimiento.categoria._id
            )
          : null
      );
    else setCategoriaValue(null);
  }, [movimiento, categorias]);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<INewMovimiento>({
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
        <Grid xs={12} item>
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
            name="categoria"
            defaultValue={initialData?.categoria}
            rules={{ required: tForm('required') }}
            render={({ field }) => (
              <TextField
                select
                size="small"
                label={t('form.categoria')}
                fullWidth
                {...field}
                disabled={disabled}
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
              >
                {categorias?.map((categoria) => (
                  <MenuItem key={categoria._id} value={categoria._id}>
                    {categoria.descripcion}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid xs={6} item>
          <Controller
            control={control}
            name="monto"
            rules={{
              required: tForm('required'),
            }}
            render={({ field }) => (
              <NumberFormat
                label={t('form.monto')}
                fullWidth
                {...field}
                error={!!errors.monto}
                helperText={errors.monto?.message}
                disabled={disabled}
                displayType={'input'}
                customInput={TextField}
                thousandSeparator={'.'}
                decimalSeparator={','}
                allowNegative={false}
                decimalScale={0}
              />
            )}
          />
        </Grid>

        {/* {movimiento && (
          <Grid xs={6} item>
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => setDisabled(false)}
            >
              {t('edit')}
            </Button>
          </Grid>
        )} */}
      </Grid>
    ),
  };
};

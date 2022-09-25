import {
  useAuthProvider,
  useCierraCajaProvider,
  useUtilsProvider,
} from '@lib/hooks';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { formatCurrency } from 'src/utils';

interface IFormCierre {
  moneda50: number;
  moneda100: number;
  moneda500: number;
  moneda1000: number;
  billete2000: number;
  billete5000: number;
  billete10000: number;
  billete20000: number;
  billete50000: number;
  billete100000: number;
  totalDesposito: number;
  responsable: string;
}

const helperCurrency = [
  50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
];

const EfectivoMoneda = {
  moneda50: 'Gs. 50',
  moneda100: 'Gs. 100',
  moneda500: 'Gs. 500',
  moneda1000: 'Gs. 1.000',
};

const EfectivobilleteMoneda = {
  billete2000: 'Gs. 2.000',
  billete5000: 'Gs. 5.000',
  billete10000: 'Gs. 10.000',
  billete20000: 'Gs. 20.000',
  billete50000: 'Gs. 50.000',
  billete100000: 'Gs. 100.000',
};

export const CierreCajaDetalle = () => {
  const { user } = useAuthProvider();

  const { saveArqueoHandler } = useCierraCajaProvider();
  const [isSaving, setIsSaving] = useState(false);
  const { showSnackbar } = useUtilsProvider();
  const { t } = useTranslation('cierreCaja', { keyPrefix: 'form' });
  const [totalImporte, setTotalImporte] = useState(0);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormCierre>({
    defaultValues: {
      moneda50: 0,
      responsable: user?.nombreApellido,
    },
  });

  const onSubmit = async (values: IFormCierre) => {
    setIsSaving(true);
    const result = await saveArqueoHandler({
      billetes: [
        {
          descripcion: EfectivobilleteMoneda['billete2000'],
          cantidad: values.billete2000,
        },
        {
          descripcion: EfectivobilleteMoneda['billete5000'],
          cantidad: values.billete5000,
        },
        {
          descripcion: EfectivobilleteMoneda['billete10000'],
          cantidad: values.billete10000,
        },
        {
          descripcion: EfectivobilleteMoneda['billete20000'],
          cantidad: values.billete20000,
        },
        {
          descripcion: EfectivobilleteMoneda['billete50000'],
          cantidad: values.billete50000,
        },
        {
          descripcion: EfectivobilleteMoneda['billete100000'],
          cantidad: values.billete100000,
        },
      ],
      monedas: [
        { descripcion: EfectivoMoneda['moneda50'], cantidad: values.moneda50 },
        {
          descripcion: EfectivoMoneda['moneda100'],
          cantidad: values.moneda100,
        },
        {
          descripcion: EfectivoMoneda['moneda500'],
          cantidad: values.moneda500,
        },
        {
          descripcion: EfectivoMoneda['moneda1000'],
          cantidad: values.moneda1000,
        },
      ],
      responsable: values.responsable,
      totalDeposito: values.totalDesposito,
      totalEfectivo: totalImporte,
    });
    if (!result.hasError) {
      showSnackbar({
        message: t('arqueoPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
    } else {
      showSnackbar({
        message: result.message || t('arqueoPersistError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const watcher = watch((value, { name, type }) => {
      if (name !== 'responsable' && name !== 'totalDesposito') {
        const multipleValues = getValues([
          'moneda50',
          'moneda100',
          'moneda500',
          'moneda1000',
          'billete2000',
          'billete5000',
          'billete10000',
          'billete20000',
          'billete50000',
          'billete100000',
        ]);
        let newTotal = 0;
        multipleValues.forEach((currentValue, index) => {
          if (currentValue)
            newTotal += Number(currentValue) * helperCurrency[index];
        });
        console.log('newTotal', newTotal);
        setTotalImporte(newTotal);
      }
    });
    return () => {
      watcher.unsubscribe();
    };
  }, [getValues, setValue, watch]);

  return (
    <Box padding={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" height="100%">
          <Typography variant="h1" sx={{ mb: 2 }}>
            {t('monedasTitle')}
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="moneda50"
                rules={{ required: t('required') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('moneda50')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    onChange={onChange}
                    value={value}
                    error={!!errors.moneda50}
                    helperText={errors.moneda50?.message}
                  />
                )}
              />
            </Grid>

            <Grid xs={6} item>
              <Controller
                control={control}
                name="moneda100"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('moneda100')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['moneda100']}
                    helperText={errors['moneda100']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="moneda500"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('moneda500')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['moneda500']}
                    helperText={errors['moneda500']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="moneda1000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('moneda1000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['moneda1000']}
                    helperText={errors['moneda1000']?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography variant="h1" sx={{ my: 2 }}>
            {t('billetesTitle')}
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete2000"
                rules={{ required: t('required') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete2000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    onChange={onChange}
                    value={value}
                    error={!!errors.billete2000}
                    helperText={errors.billete2000?.message}
                  />
                )}
              />
            </Grid>

            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete5000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete5000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['billete5000']}
                    helperText={errors['billete5000']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete10000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete10000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['billete10000']}
                    helperText={errors['billete10000']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete20000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete20000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['billete20000']}
                    helperText={errors['billete20000']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete50000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete50000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['billete50000']}
                    helperText={errors['billete50000']?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="billete100000"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('billete100000')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['billete100000']}
                    helperText={errors['billete100000']?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Typography variant="h1" sx={{ my: 2 }}>
            {t('total')}
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={6} item>
              <TextField
                label={t('totalEfectivo')}
                fullWidth
                value={formatCurrency(totalImporte)}
                disabled
                // InputProps={{
                //   startAdornment: (
                //     <div
                //       style={{
                //         display: 'flex',
                //         flexDirection: 'column',
                //         justifyContent: 'center',
                //         alignContent: 'center',
                //         textAlign: 'center',
                //         backgroundColor: '#F3F3F3',
                //         height: 38,
                //         width: 38,
                //         marginLeft: -13,
                //         marginRight: 5,
                //       }}
                //     >
                //       <InputAdornment position="start">
                //         &nbsp; GS.
                //       </InputAdornment>
                //     </div>
                //   ),
                // }}
              />
            </Grid>

            <Grid xs={6} item>
              <Controller
                control={control}
                name="totalDesposito"
                rules={{ required: t('required') }}
                render={({ field }) => (
                  <NumberFormat
                    thousandSeparator
                    disabled={isSaving}
                    label={t('totalDeposito')}
                    fullWidth
                    {...field}
                    customInput={TextField}
                    error={!!errors['totalDesposito']}
                    helperText={errors['totalDesposito']?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Typography variant="h1" sx={{ my: 2 }}>
            {t('responsable')}
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="responsable"
                rules={{ required: t('required') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    label={t('responsable')}
                    fullWidth
                    {...field}
                    onChange={onChange}
                    value={value}
                    error={!!errors.responsable}
                    helperText={errors.responsable?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Button
                type="submit"
                color="success"
                sx={{ width: '100%' }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  <Typography>{t('submit')}</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

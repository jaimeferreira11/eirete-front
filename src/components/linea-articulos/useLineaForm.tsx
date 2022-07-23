import { ILineaArticulo } from '@core/interfaces';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Grid, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  linea?: ILineaArticulo;
}

export const useLineaForm = ({ linea = undefined }: Props) => {
  const { t } = useTranslation('lineaArticulosABM');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const initialData = useMemo(() => {
    return linea
      ? {
          descripcion: linea.descripcion,
        }
      : {
          descripcion: '',
        };
  }, [linea]);

  const [disabled, setDisabled] = useState(linea ? true : false);

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
                size="small"
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

        {linea && (
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

import { FC } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { IMovimiento } from '@core/interfaces';
import { useMovimientosProvider, useUtilsProvider } from '@lib/hooks';
import { INewMovimiento } from '@lib/interfaces';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMovimientoForm } from './useMovimientoForm';

interface Props {
  children?: React.ReactNode;
  movimiento: IMovimiento;
  onCancel: () => void;
  tipo: 'ingresos' | 'egresos';
}

export const MovimientoEditView: FC<Props> = ({
  movimiento,
  onCancel,
  tipo,
}) => {
  const { t } = useTranslation('movimientosABM');
  const { update } = useMovimientosProvider();
  const { showSnackbar } = useUtilsProvider();
  const { form, handleSubmit, disabled } = useMovimientoForm({
    movimiento,
    tipo,
  });

  const onSubmit = async (newData: INewMovimiento) => {
    const result = await update(newData, movimiento._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('updated'),
        type: 'success',
        show: true,
      });

      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('persistError'),
        type: 'error',
        show: true,
      });
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        height="100%"
      >
        <Grid item>{form}</Grid>
        <Grid container item spacing={2}>
          <Grid item>
            <Button
              onClick={onCancel}
              color="error"
              startIcon={<CloseOutlinedIcon />}
            >
              <Typography>Cancelar</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="success"
              startIcon={<CheckOutlinedIcon />}
              sx={{ color: 'white ' }}
              disabled={disabled}
            >
              <Typography>Guardar</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

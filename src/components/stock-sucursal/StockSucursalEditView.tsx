import { FC } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { IStockArticuloSucursal } from '@core/interfaces';
import { useArticulosProvider, useUtilsProvider } from '@lib/hooks';
import { INewArticulo } from '@lib/interfaces';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { clearNumberFormat } from 'src/utils';
import { useStockSucursalForm } from './useStockSucursalForm';

interface Props {
  articuloStock: IStockArticuloSucursal;
  onCancel: () => void;
  sucursalId: string;
}

export const StockSucursalEditView: FC<Props> = ({
  articuloStock,
  onCancel,
  sucursalId,
}) => {
  const { t } = useTranslation('stockSucursalABM');
  const { update } = useArticulosProvider();
  const { showSnackbar } = useUtilsProvider();
  const { form, handleSubmit, disabled } = useStockSucursalForm({
    articuloStock,
    sucursalId,
  });

  const onSubmit = async (newArticulo: INewArticulo) => {
    newArticulo.precioVenta = clearNumberFormat(newArticulo.precioVenta);

    const result = await update(newArticulo, articuloStock._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('articuloUpdated'),
        type: 'success',
        show: true,
      });
      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('articuloPersistError'),
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
        <Grid container item spacing={2} sx={{ mb: 2 }}>
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

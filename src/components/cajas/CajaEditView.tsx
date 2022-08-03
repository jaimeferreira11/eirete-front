import { FC } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { ICaja } from '@core/interfaces';
import { useUtilsProvider } from '@lib/hooks';
import { useCajasProvider } from '@lib/hooks/providers/useCajasProvider';
import { INewCaja } from '@lib/interfaces';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCajaForm } from './useCajaForm';

interface Props {
  children?: React.ReactNode;
  caja: ICaja;
  onCancel: () => void;
}

export const CajaEditView: FC<Props> = ({ caja, onCancel }) => {
  const { t } = useTranslation('cajasABM');
  const { update } = useCajasProvider();
  const { showSnackbar } = useUtilsProvider();
  const { form, handleSubmit, disabled } = useCajaForm({
    caja,
  });

  const onSubmit = async (newCaja: INewCaja) => {
    const newCajaCrud = {
      ...newCaja,
      sucursal: { _id: newCaja.sucursal },
    };

    const result = await update(newCajaCrud, caja._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('cajaUpdated'),
        type: 'success',
        show: true,
      });

      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('cajaPersistError'),
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

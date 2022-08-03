import { FC } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { ISucursal } from '@core/interfaces';
import { useSucuralesProvider, useUtilsProvider } from '@lib/hooks';
import { INewSucursal } from '@lib/interfaces';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useSucursalForm } from './useSucursalForm';

interface Props {
  children?: React.ReactNode;
  sucursal: ISucursal;
  onCancel: () => void;
}

export const SucursalEditView: FC<Props> = ({ sucursal, onCancel }) => {
  const { t } = useTranslation('sucursalesABM');
  const { update } = useSucuralesProvider();
  const { showSnackbar } = useUtilsProvider();
  const { form, handleSubmit, disabled } = useSucursalForm({
    sucursal,
  });

  const onSubmit = async (newSucursal: INewSucursal) => {
    const result = await update(newSucursal, sucursal._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('sucursalUpdated'),
        type: 'success',
        show: true,
      });

      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('sucursalPersistError'),
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

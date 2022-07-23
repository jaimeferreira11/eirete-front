import { ILineaArticulo } from '@core/interfaces';
import { useLineasProvider, useSnackbarProvider } from '@lib/hooks';
import { INewLineaArticulo } from '@lib/interfaces';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useLineaForm } from './useLineaForm';

interface Props {
  children?: React.ReactNode;
  linea: ILineaArticulo;
  onCancel: () => void;
}

export const LineaEditView: FC<Props> = ({ linea, onCancel }) => {
  const { t } = useTranslation('lineaArticulosABM');
  const { update } = useLineasProvider();
  const { showSnackbar } = useSnackbarProvider();
  const { form, handleSubmit, disabled } = useLineaForm({
    linea,
  });

  const onSubmit = async (newLinea: INewLineaArticulo) => {
    const result = await update(newLinea, linea._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('lineaUpdated'),
        type: 'success',
        show: true,
      });

      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('lineaPersistError'),
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

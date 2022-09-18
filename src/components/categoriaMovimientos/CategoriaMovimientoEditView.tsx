import { FC } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { ICategoriaMovimiento } from '@core/interfaces';
import { useCategoriaMovimientosProvider, useUtilsProvider } from '@lib/hooks';
import { INewCategoriaMovimiento } from '@lib/interfaces/NewCategoriaMovimiento';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCategoriaMovimientoForm } from './useCategoriaMovimientoForm';

interface Props {
  children?: React.ReactNode;
  categoria: ICategoriaMovimiento;
  onCancel: () => void;
}

export const CategoriaMovimientoEditView: FC<Props> = ({
  categoria,
  onCancel,
}) => {
  const { t } = useTranslation('categoriaMovimientosABM');
  const { update } = useCategoriaMovimientosProvider();
  const { showSnackbar } = useUtilsProvider();
  const { form, handleSubmit, disabled } = useCategoriaMovimientoForm({
    categoria,
  });

  const onSubmit = async (newCateoria: INewCategoriaMovimiento) => {
    const newCateoriaCrud = {
      ...newCateoria,
    };

    const result = await update(newCateoriaCrud, categoria._id);
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

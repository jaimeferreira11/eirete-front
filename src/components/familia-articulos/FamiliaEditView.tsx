import { IFamiliaArticulo } from '@core/interfaces';
import { useSnackbarProvider } from '@lib/hooks';
import { useFamiliasProvider } from '@lib/hooks/providers/useFamiliasProvider';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { INewFamiliaArticulo } from '../../lib/interfaces/NewFamiliaArticulo';
import { useFamiliaForm } from './useFamiliaForm';



interface Props {
  children?: React.ReactNode;
  familia: IFamiliaArticulo;
  onCancel: () => void;
}

export const FamiliaEditView: FC<Props> = ({ familia, onCancel }) => {
  const { t } = useTranslation('familiaArticulosABM');
  const { update } = useFamiliasProvider();
  const { showSnackbar } = useSnackbarProvider();
  const { form, handleSubmit, disabled } = useFamiliaForm({
    familia,
  });

  const onSubmit = async (newFamilia: INewFamiliaArticulo) => {
    const result = await update(newFamilia, familia._id);
    if (!result.hasError) {
      showSnackbar({
        message: t('familiaUpdated'),
        type: 'success',
        show: true,
      });

      onCancel();
    } else {
      showSnackbar({
        message: result.message || t('familiaPersistError'),
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

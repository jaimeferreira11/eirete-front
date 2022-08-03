import { ILineaArticulo } from '@core/interfaces';
import { useLineasProvider, useUtilsProvider } from '@lib/hooks';
import { INewLineaArticulo } from '@lib/interfaces';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { useLineaForm } from './useLineaForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  linea?: ILineaArticulo;
}

export const LineaDialog: FC<Props> = ({
  open,
  handleClose,
  linea = undefined,
}) => {
  const { t } = useTranslation('lineaArticulosABM');
  const { save } = useLineasProvider();
  const { showSnackbar } = useUtilsProvider();

  const title = linea ? t('editUser') : t('newLinea');

  const { form, handleSubmit, reset } = useLineaForm({ linea });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newLinea: INewLineaArticulo) => {
    setIsSaving(true);
    const result = await save(newLinea);
    if (!result.hasError) {
      showSnackbar({
        message: t('lineaPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('lineaPersistError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  };

  const handleCancelButton = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root': {
          padding: 2,
        },
        '& .MuiDialogActions-root': {
          padding: 1,
        },
      }}
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ maxHeight: '450px' }}>{form}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelButton} disabled={isSaving}>
            <Typography>{t('form.cancel')}</Typography>
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <CircularProgress size="25px" color="info" />
            ) : (
              <Typography>{t('form.save')}</Typography>
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

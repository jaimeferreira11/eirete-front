import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { ICategoriaMovimiento } from '@core/interfaces';

import { useCategoriaMovimientosProvider, useUtilsProvider } from '@lib/hooks';
import { INewCategoriaMovimiento } from '@lib/interfaces/NewCategoriaMovimiento';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useCategoriaMovimientoForm } from './useCategoriaMovimientoForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  categoria?: ICategoriaMovimiento;
}

export const CategoriaMovimientoDialog: FC<Props> = ({
  open,
  handleClose,
  categoria = undefined,
}) => {
  const { t } = useTranslation('categoriaMovimientosABM');
  const { save } = useCategoriaMovimientosProvider();
  const { showSnackbar } = useUtilsProvider();

  const title = categoria ? t('edit') : t('new');

  const { form, handleSubmit, reset } = useCategoriaMovimientoForm({
    categoria,
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newCategoria: INewCategoriaMovimiento) => {
    setIsSaving(true);
    const result = await save(newCategoria);
    if (!result.hasError) {
      showSnackbar({
        message: t('persist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('persistError'),
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
          <Button
            color="error"
            onClick={handleCancelButton}
            disabled={isSaving}
          >
            <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
            <Typography>{t('form.cancel')}</Typography>
          </Button>
          <Button type="submit" color="success" disabled={isSaving}>
            {!isSaving && (
              <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
            )}
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

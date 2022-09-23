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

import { IMovimiento } from '@core/interfaces';
import { useMovimientosProvider, useUtilsProvider } from '@lib/hooks';
import { INewMovimiento } from '@lib/interfaces';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { clearNumberFormat } from 'src/utils';
import { useMovimientoForm } from './useMovimientoForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  movimiento?: IMovimiento;
  tipo: 'ingresos' | 'egresos';
}

export const MovimientoDialog: FC<Props> = ({
  open,
  handleClose,
  movimiento = undefined,
  tipo,
}) => {
  const { t } = useTranslation('movimientosABM');
  const { save } = useMovimientosProvider();
  const { showSnackbar } = useUtilsProvider();

  const title = movimiento ? t('edit') : t('new');

  const { form, handleSubmit, reset } = useMovimientoForm({ movimiento, tipo });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newData: INewMovimiento) => {
    setIsSaving(true);

    newData.monto = clearNumberFormat(newData.monto);

    const result = await save({
      ...newData,
      categoria: { _id: newData.categoria },
    });
    if (!result.hasError) {
      showSnackbar({
        message: t('persist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      reset();
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

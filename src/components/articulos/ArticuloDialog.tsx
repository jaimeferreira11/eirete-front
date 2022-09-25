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

import { useArticulosProvider, useUtilsProvider } from '@lib/hooks';
import { INewArticulo } from '@lib/interfaces';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { clearNumberFormat } from 'src/utils';
import { useArticuloForm } from './useArticuloForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

export const ArticuloDialog: FC<Props> = ({ open, handleClose }) => {
  const { t } = useTranslation('articulosABM');
  const { save } = useArticulosProvider();
  const { showSnackbar } = useUtilsProvider();

  const title = t('newArticulo');

  const { form, handleSubmit, reset } = useArticuloForm({
    articulo: undefined,
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newArticulo: INewArticulo) => {
    setIsSaving(true);

    newArticulo.precioVenta = clearNumberFormat(newArticulo.precioVenta);
    const result = await save(newArticulo);
    if (!result.hasError) {
      showSnackbar({
        message: t('articuloPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('articuloPersistError'),
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

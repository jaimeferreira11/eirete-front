import { IFamiliaArticulo } from '@core/interfaces';
import { useSnackbarProvider } from '@lib/hooks';
import { useFamiliasProvider } from '@lib/hooks/providers/useFamiliasProvider';
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
import { INewFamiliaArticulo } from '../../lib/interfaces/NewFamiliaArticulo';
import { useFamiliaForm } from './useFamiliaForm';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  familia?: IFamiliaArticulo;
}

export const FamiliaDialog: FC<Props> = ({
  open,
  handleClose,
  familia = undefined,
}) => {
  const { t } = useTranslation('familiaArticulosABM');
  const { save } = useFamiliasProvider();
  const { showSnackbar } = useSnackbarProvider();

  const title = familia ? t('editUser') : t('newFamilia');

  const { form, handleSubmit } = useFamiliaForm({ familia });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (newFamilia: INewFamiliaArticulo) => {
    setIsSaving(true);
    const result = await save(newFamilia);
    if (!result.hasError) {
      showSnackbar({
        message: t('familiaPersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('familiaPersistError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
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
          <Button onClick={handleClose} disabled={isSaving}>
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

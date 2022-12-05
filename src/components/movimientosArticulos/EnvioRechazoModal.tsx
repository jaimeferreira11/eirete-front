import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { IArticuloMovimiento } from '@core/interfaces';
import { useEnvioProvider, useUtilsProvider } from '@lib/hooks';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTranslation } from 'next-i18next';

interface Props {
  showMotivo: boolean;
  handleClose: () => void;
  envio: IArticuloMovimiento;
  children?: React.ReactNode;
}

export const EnvioRechazoModal: FC<Props> = ({
  showMotivo,
  handleClose,
  envio,
}) => {
  const { showSnackbar } = useUtilsProvider();
  const { rechazarEnvio } = useEnvioProvider();
  const [motivo, setMotivo] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'listado',
  });

  useEffect(() => {
    return () => {
      setMotivo('');
    };
  }, []);

  const close = useCallback(() => {
    handleClose();
    setMotivo('');
  }, [handleClose]);

  const handleMotivoChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMotivo(target.value);

  const handleRechazarEnvio = useCallback(async () => {
    if (!envio) return;
    setIsRejecting(true);
    const result = await rechazarEnvio({
      ...envio,
      estado: 'RECHAZADO',
      obs: motivo,
    });

    if (!result.hasError) {
      showSnackbar({
        message: t('rechazoExitoso'),
        type: 'success',
        show: true,
      });
      setIsRejecting(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('rechazoError'),
        type: 'error',
        show: true,
      });
      setIsRejecting(false);
    }
  }, [envio, handleClose, motivo, rechazarEnvio, showSnackbar, t]);

  return (
    <>
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
        maxWidth="sm"
        open={showMotivo}
        onClose={handleClose}
      >
        <DialogTitle>Rechazar envío </DialogTitle>
        <DialogContent
          style={{
            maxHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {!isRejecting ? (
            <TextField
              id="standard-textarea"
              label={'Ingrese el motivo'}
              placeholder={'El articulo estaba dañado'}
              multiline
              minRows={3}
              variant="standard"
              value={motivo}
              onChange={handleMotivoChange}
              fullWidth
            />
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={close}>
            <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
            <Typography>Cancelar</Typography>
          </Button>

          <Button
            color="success"
            onClick={handleRechazarEnvio}
            disabled={motivo.length === 0 || !envio}
          >
            {isRejecting ? (
              <CircularProgress size="25px" color="info" />
            ) : (
              <>
                <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
                <Typography>Rechazar</Typography>
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

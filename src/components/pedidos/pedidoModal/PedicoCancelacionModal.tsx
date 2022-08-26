import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import ModalConfirmation from '@components/ui/ConfirmationModal/ModalConfirmation';
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
import { KeyedMutator } from 'swr';

import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';
import { usePedidosProvider, useUtilsProvider } from '@lib/hooks';

interface Props {
  show: boolean;
  handleClose: () => void;
  nroPedido: number;
  pedidoId: string;
  mutate: KeyedMutator<ListPaginatedResponse<IPedidoResponse>>;
  children?: React.ReactNode;
}

export const PedicoCancelacionModal: FC<Props> = ({
  show,
  handleClose,
  nroPedido,
  mutate,
  pedidoId,
}) => {
  const { t } = useTranslation('pedidos');
  const [canceling, setCanceling] = useState(false);
  const { showSnackbar } = useUtilsProvider();
  const { cancelarPedido } = usePedidosProvider();
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const [motivo, setMotivo] = useState('');

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

  const handleSecondCancelacion = useCallback(async () => {
    setShowModalConfirmation(false);
    setCanceling(true);
    const result = await cancelarPedido(pedidoId);

    if (!result.hasError) {
      showSnackbar({
        message: t('pedidoCancelacionExitosa'),
        type: 'success',
        show: true,
      });
      setCanceling(false);
      mutate();

      close();

      return;
    }

    setCanceling(false);
    showSnackbar({
      message: result.message || t('pedidoCancelacionError'),
      type: 'error',
      show: true,
    });
  }, [cancelarPedido, close, mutate, pedidoId, showSnackbar, t]);

  const handleFirstConfirmationCancelacion = useCallback(() => {
    setShowModalConfirmation(true);
  }, []);

  return (
    <>
      <ModalConfirmation
        onCancel={() => {
          setShowModalConfirmation(false);
        }}
        message={t('confirmCancelacion')}
        open={showModalConfirmation}
        onAccept={handleSecondCancelacion}
        title={t('pedidoCancelacion')}
      />
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
        open={show}
        onClose={handleClose}
      >
        <DialogTitle>{t('cancelarPedido', { nroPedido })}</DialogTitle>
        <DialogContent
          style={{
            maxHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {!canceling ? (
            <TextField
              id="standard-textarea"
              label={t('motivoCancelacion')}
              placeholder={t('motivoCancelacionEjemplo')}
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
            <Typography>{t('cancelar')}</Typography>
          </Button>

          <Button
            onClick={handleFirstConfirmationCancelacion}
            disabled={motivo.length === 0 || !pedidoId}
          >
            <Typography>{t('confirmar')}</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { DeliveryEstado } from '@core/interfaces';
import { usePedidosProvider, useUtilsProvider } from '@lib/hooks';

interface Props {
  show: boolean;
  pedidoId: string;
  estadoActual: DeliveryEstado;
  handleClose: (mutate: boolean) => void;
  children?: React.ReactNode;
}

const estadosPosiblesDelivery: {
  [key in string]: { value: DeliveryEstado; description: string };
} = {
  EN_ESPERA: { value: 'EN_CAMINO', description: 'En camino' },
  EN_CAMINO: { value: 'ENTREGADO', description: 'Entregado' },
};

export const DeliveryChangeStateModal: FC<Props> = ({
  show,
  handleClose,
  pedidoId,
  estadoActual,
}) => {
  const { t } = useTranslation('pedidos', {
    keyPrefix: 'delivery.changeState',
  });

  const { changeStatusDeliveryPedido } = usePedidosProvider();
  const { showSnackbar } = useUtilsProvider();
  const [isSaving, setIsSaving] = useState(false);
  const [valueEstadoChange, setValueEstadoChange] = useState('ignore');

  const estadosOpciones = [
    { value: 'ignore', description: t('cambioEstadoCombo') },
    estadosPosiblesDelivery[estadoActual],
    { value: 'PERDIDO', description: 'Perdido' },
  ];

  const handleEstadoChange = async () => {
    const result = await changeStatusDeliveryPedido(
      pedidoId,
      valueEstadoChange as DeliveryEstado
    );

    if (!result.hasError) {
      showSnackbar({
        message: t('statePersist'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose(true);
      setValueEstadoChange('ignore');
    } else {
      showSnackbar({
        message: result.message || t('stateError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  };

  if (!pedidoId) return null;

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
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogContent style={{ maxHeight: '80vh' }}>
        <TextField
          size="small"
          select
          label={''}
          fullWidth
          value={valueEstadoChange}
          onChange={(e) => setValueEstadoChange(e.target.value)}
        >
          {estadosOpciones.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.description}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(false)}
          variant="outlined"
          sx={{ color: '#000' }}
          disabled={isSaving}
        >
          <Typography>{t('volver')}</Typography>
        </Button>
        <Button
          onClick={handleEstadoChange}
          disabled={valueEstadoChange === 'ignore' || isSaving}
        >
          {isSaving ? (
            <CircularProgress size="25px" color="info" />
          ) : (
            <Typography>{t('ok')}</Typography>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

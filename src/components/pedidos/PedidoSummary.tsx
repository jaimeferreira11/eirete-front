import { ChangeEvent } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import { TipoPedido, TipoPedidoArray } from '@core/interfaces/TipoPedidos';
import { usePedidosProvider } from '@lib/hooks';
import { useTranslation } from 'next-i18next';
import { ClienteAutocomplete } from './ClienteAutocomplete';

export const PedidoSummary = () => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });

  const {
    newPedido,
    setTipoPedido,
    resetPedido,
    isPedidoComplete,
    getImpuesto10,
    getImpuesto5,
    setMontoRecibido,
  } = usePedidosProvider();

  const { tipoPedido, importeTotal, montoRecibido } = newPedido;

  const handleChangeMonto = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMontoRecibido(target.value);
  };

  return (
    <Box flex="50%" display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderTop: '0.1em solid #EAEAEA',
          borderBottom: '0.1em solid #EAEAEA',
          py: 1,
          my: 2,
        }}
      >
        <Box display="flex">
          <Typography sx={{ fontWeight: 500 }}>
            Iva 5%: Gs. {getImpuesto5()}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 500 }}>
            Iva 10%: Gs {getImpuesto10()}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
          {`${t('total')} : ${importeTotal} Gs.`}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-evenly" gap={3} sx={{ mb: 2 }}>
        <ClienteAutocomplete />
        <TextField
          fullWidth
          InputProps={{}}
          label={t('ruc')}
          value={newPedido.cliente?.persona.ruc || ''}
        />
        <TextField
          id="tipo-pedido-select"
          select
          label={t('tipoPedido')}
          fullWidth
          value={tipoPedido}
          onChange={(event) => setTipoPedido(event.target.value as TipoPedido)}
        >
          {TipoPedidoArray.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box display="flex" justifyContent="space-evenly" gap={3} sx={{ my: 4 }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('efectivo')}
          </InputLabel>
          <OutlinedInput
            disabled={importeTotal === 0}
            type="number"
            inputProps={{
              min: 0,
            }}
            size="small"
            id="efectivo-adornment"
            startAdornment={
              <InputAdornment position="start">GS.</InputAdornment>
            }
            label={t('cantidad')}
            value={montoRecibido}
            onChange={handleChangeMonto}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('tarjeta')}
          </InputLabel>
          <OutlinedInput
            disabled={importeTotal === 0}
            type="number"
            inputProps={{
              min: 0,
            }}
            size="small"
            id="tarjeta-adornment"
            startAdornment={
              <InputAdornment position="start">GS.</InputAdornment>
            }
            label={t('cantidad')}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('cheque')}
          </InputLabel>
          <OutlinedInput
            disabled={importeTotal === 0}
            type="number"
            inputProps={{
              min: 0,
            }}
            id="cheque-adornment-amount"
            size="small"
            startAdornment={
              <InputAdornment position="start">GS.</InputAdornment>
            }
            label={t('cantidad')}
          />
        </FormControl>
      </Box>

      <Box
        display="flex"
        gap={4}
        alignItems="center"
        sx={{
          borderTop: '0.1em solid #EAEAEA',
          borderBottom: '0.1em solid #EAEAEA',
          py: 1,
          mb: 2,
        }}
      >
        <Typography sx={{ flex: 1, fontSize: 18, fontWeight: 800 }}>
          {`${t('montoRecibido')}: Gs. ${montoRecibido}`}
        </Typography>
        <Typography sx={{ flex: 1, fontSize: 18, ml: 2, fontWeight: 800 }}>
          {`${t('total')}: Gs. ${importeTotal}`}
        </Typography>

        <Typography sx={{ flex: 1, fontSize: 18, fontWeight: 800 }}>
          {`${t('vuelto')}: Gs. ${montoRecibido - importeTotal}`}
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={4}
        flex={1}
        alignItems="center"
        sx={{
          borderTop: '0.1em solid #EAEAEA',
          borderBottom: '0.1em solid #EAEAEA',
          py: 1,
          mb: 2,
        }}
      >
        <Button color="error" fullWidth onClick={() => resetPedido()}>
          {t('cancelar')}
        </Button>
        <Button
          color="success"
          disabled={!isPedidoComplete()}
          fullWidth
          sx={{ color: '#fff' }}
        >
          {t('confirmar')}
        </Button>
      </Box>
    </Box>
  );
};

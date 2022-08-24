import { ChangeEvent, KeyboardEvent, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import { TipoPedido, TipoPedidoArray } from '@core/interfaces/TipoPedidos';
import { usePedidosProvider, useUtilsProvider } from '@lib/hooks';
import { useTranslation } from 'next-i18next';
import { formatCurrency } from 'src/utils';
import { TiposPago } from '../../core/interfaces/MetodoPago';

export const PedidoSummary = () => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });
  const { showSnackbar } = useUtilsProvider();

  const [submiting, setSubmiting] = useState(false);
  const [searchingRuc, setSearchingRuc] = useState(false);
  const [rucError, setRucError] = useState<string | undefined>('');
  const {
    newPedido,
    setTipoPedido,
    resetPedido,
    isPedidoComplete,
    getImpuesto10,
    getImpuesto5,
    getMontoMetodoPago,
    toogleExtentoIVA,
    searchCliente,
    updateMetodosPago,
    getTotal,
    submitPedido,
    updateRazonSocial,
  } = usePedidosProvider();

  const { tipoPedido, importeTotal, exentoIVA } = newPedido;

  const handleChangeMonto = ({
    descripcion,
    importe,
  }: {
    descripcion: TiposPago;
    importe: number;
  }) => {
    updateMetodosPago({ descripcion, importe });
  };

  const [rucValue, setRucValue] = useState('');

  const onChangeRuc = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRucValue(e.target.value);
  };

  const onChangeRazonSocial = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateRazonSocial(e.target.value);
  };

  const rucSearch = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setRucError('');
      setSearchingRuc(true);
      const res = await searchCliente(rucValue);
      setSearchingRuc(false);
      setRucError(res.errorMessage || '');
      if (res.ruc) setRucValue(res.ruc);
    }
  };

  const handleSubmit = async () => {
    setSubmiting(true);
    const result = await submitPedido();
    setSubmiting(false);
    if (!result.hasError) {
      showSnackbar({
        message: t('pedidoSubmit'),
        type: 'success',
        show: true,
      });
      resetPedido();
      return;
    }

    showSnackbar({
      message: result.message || t('pedidoSubmitError'),
      type: 'error',
      show: true,
    });
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
        <Box display="flex" gap={2} alignItems="center">
          <Box display="flex" alignItems="center">
            <Checkbox
              sx={{ padding: 0.5 }}
              value={exentoIVA}
              onChange={() => toogleExtentoIVA()}
            />
            <Typography sx={{ fontWeight: 500 }}>{t('exentoIva')}</Typography>
          </Box>
          <Box display="flex">
            <Typography sx={{ fontWeight: 500 }}>
              Iva 5%: {formatCurrency(exentoIVA ? 0 : getImpuesto5())}
            </Typography>
            <Typography sx={{ ml: 2, fontWeight: 500 }}>
              Iva 10%: {formatCurrency(exentoIVA ? 0 : getImpuesto10())}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
          {`${t('total')} : ${formatCurrency(importeTotal)}`}
        </Typography>
      </Box>
      <Grid container justifyContent="space-between">
        <Grid item xs={6} sx={{ pr: 1 }}>
          <TextField
            id="tipo-pedido-select"
            select
            label={t('tipoPedido')}
            fullWidth
            value={tipoPedido}
            onChange={(event) =>
              setTipoPedido(event.target.value as TipoPedido)
            }
          >
            {TipoPedidoArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sx={{ pl: 1 }}>
          <TextField
            fullWidth
            label={t('ruc')}
            onKeyDown={rucSearch}
            onChange={onChangeRuc}
            value={rucValue}
            disabled={searchingRuc}
            InputProps={{
              endAdornment: searchingRuc ? (
                <InputAdornment position="start">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : null,
            }}
            error={!!rucError}
            helperText={rucError}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            InputProps={{}}
            label={t('razonSocial')}
            value={newPedido.cliente?.persona.nombreApellido || ''}
            disabled={newPedido.cliente?.persona.nombreApellido !== undefined}
            onChange={onChangeRazonSocial}
          />
        </Grid>
      </Grid>
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
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'EFECTIVO',
              })
            }
            value={getMontoMetodoPago('EFECTIVO') || ''}
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
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'TARJETA',
              })
            }
            value={getMontoMetodoPago('TARJETA') || ''}
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
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'CHEQUE',
              })
            }
            value={getMontoMetodoPago('CHEQUE') || ''}
          />
        </FormControl>
      </Box>

      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-around"
        sx={{
          borderTop: '0.1em solid #EAEAEA',
          borderBottom: '0.1em solid #EAEAEA',
          py: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            flex: 1,
            fontSize: 18,
            ml: 2,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          {`${t('total')}: ${formatCurrency(getTotal())}`}
        </Typography>

        <Typography
          sx={{ flex: 1, fontSize: 18, fontWeight: 800, textAlign: 'center' }}
        >
          {`${t('vuelto')}: ${formatCurrency(getTotal() - importeTotal)}`}
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
          disabled={!isPedidoComplete() && !submiting}
          fullWidth
          sx={{ color: '#fff' }}
          onClick={handleSubmit}
        >
          {!submiting ? t('confirmar') : <CircularProgress size="25px" />}
        </Button>
      </Box>
    </Box>
  );
};

import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
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
import { formatNumber } from 'src/utils';
import { TiposPago } from '../../core/interfaces/MetodoPago';

interface Props {
  handleEditDireccion: () => void;
  handleSearchCliente: () => void;
  children?: React.ReactNode;
}

export const PedidoSummary: FC<Props> = ({
  handleEditDireccion,
  handleSearchCliente,
}) => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });
  const { showSnackbar } = useUtilsProvider();

  const [submiting, setSubmiting] = useState(false);
  const [searchingRuc, setSearchingRuc] = useState(false);
  const [rucError, setRucError] = useState<string | undefined>('');
  const [rucWarning, setRucWarning] = useState('');
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
    direccionDelivery,
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

  useEffect(() => {
    setRucValue(newPedido.cliente?.persona.nroDoc || '');
  }, [newPedido.cliente?.persona.nroDoc]);

  const rucSearch = async () => {
    setRucError('');

    if (rucValue) {
      setSearchingRuc(true);
      const { errorMessage = '', ruc } = await searchCliente(rucValue);
      if (errorMessage?.includes('no existe')) {
        setRucError('');
        setRucWarning(t('rucWarning'));
      } else if (errorMessage?.includes('al menos')) {
        setRucWarning('');
        setRucError(errorMessage);
      }
      setSearchingRuc(false);
      if (ruc) setRucValue(ruc);
    } else {
      handleSearchCliente();
    }
  };

  const handleEnterRuc = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      rucSearch();
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

  const getVuelto = () => {
    const vuelto = getTotal() - importeTotal;

    return vuelto > 0 ? vuelto : 0;
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
            <Typography>
              <b>Iva 5%:</b> {formatNumber(exentoIVA ? 0 : getImpuesto5())}
            </Typography>
            <Typography sx={{ ml: 2 }}>
              <b>Iva 10%:</b> {formatNumber(exentoIVA ? 0 : getImpuesto10())}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800 }}>
          {`${t('total')} : ${formatNumber(importeTotal)}`}
        </Typography>
      </Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid container direction="column" item xs={6} sx={{ pr: 1 }}>
          <Grid item>
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
        </Grid>
        <Grid item xs={5} sx={{ pl: 1 }}>
          <TextField
            fullWidth
            label={t('ruc')}
            onKeyDown={handleEnterRuc}
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
            helperText={rucWarning || rucError}
          />
        </Grid>
        <Grid item xs={1} sx={{ pl: 1 }}>
          <IconButton onClick={rucSearch}>
            <SearchIcon sx={{ color: '#F5B223' }} />
          </IconButton>
        </Grid>
        {tipoPedido === 'DELIVERY' && newPedido.cliente && (
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontSize: 15 }}>
                Direccion de envio
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 13 }}>
                {direccionDelivery?.direccion}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 10 }}>
                {direccionDelivery?.ciudad}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={6}
              sx={{ mt: 2 }}
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color={'primary'}
                onClick={handleEditDireccion}
              >
                {direccionDelivery ? t('editDirEnvio') : t('setDirEnvio')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            InputProps={{}}
            label={t('razonSocial')}
            value={newPedido.cliente?.persona.nombreApellido || ''}
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  backgroundColor: '#F3F3F3',
                  height: 38,
                  width: 38,
                  marginLeft: -13,
                  marginRight: 5,
                }}
              >
                <InputAdornment position="start">&nbsp; GS.</InputAdornment>
              </div>
            }
            label={t('cantidad')}
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'EFECTIVO',
              })
            }
            value={formatNumber(getMontoMetodoPago('EFECTIVO')) || ''}
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  backgroundColor: '#F3F3F3',
                  height: 38,
                  width: 38,
                  marginLeft: -13,
                  marginRight: 5,
                }}
              >
                <InputAdornment position="start">&nbsp; GS.</InputAdornment>
              </div>
            }
            label={t('cantidad')}
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'TARJETA',
              })
            }
            value={formatNumber(getMontoMetodoPago('TARJETA')) || ''}
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                  backgroundColor: '#F3F3F3',
                  height: 38,
                  width: 38,
                  marginLeft: -13,
                  marginRight: 5,
                }}
              >
                <InputAdornment position="start">&nbsp; GS.</InputAdornment>
              </div>
            }
            label={t('cantidad')}
            onChange={(e) =>
              handleChangeMonto({
                importe: Number(e.target.value),
                descripcion: 'CHEQUE',
              })
            }
            value={formatNumber(getMontoMetodoPago('CHEQUE')) || ''}
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
          {`${t('total')}: ${formatNumber(getTotal())}`}
        </Typography>

        <Typography
          sx={{ flex: 1, fontSize: 18, fontWeight: 800, textAlign: 'center' }}
        >
          {`${t('vuelto')}: ${formatNumber(getVuelto())}`}
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
          <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          {t('cancelar')}
        </Button>
        <Button
          color="success"
          disabled={!isPedidoComplete() && !submiting}
          fullWidth
          sx={{ color: '#fff' }}
          onClick={handleSubmit}
        >
          {!submiting && (
            <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          )}
          {!submiting ? t('confirmar') : <CircularProgress size="25px" />}
        </Button>
      </Box>
    </Box>
  );
};

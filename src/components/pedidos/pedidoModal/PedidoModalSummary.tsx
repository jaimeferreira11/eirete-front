import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { IPedidoDetalle } from '@core/interfaces';
import { TipoPedido, TipoPedidoArray } from '@core/interfaces/TipoPedidos';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { formatCurrency, formateDate } from 'src/utils';

interface Props {
  exentoIVA: boolean;
  nroPedido: number;
  fecha: string;
  impuesto5: number;
  impuesto10: number;
  importeTotal: number;
  tipoPedido: TipoPedido;
  rucValue: string;
  razonSocial: string;
  montoEfectivo: number;
  montoTarjeta: number;
  montoCheque: number;
  total: number;
  vuelto: number;
  items: IPedidoDetalle[];
  children?: React.ReactNode;
}

export const PedidoModalSummary: FC<Props> = ({
  nroPedido,
  fecha,
  exentoIVA,
  impuesto5,
  impuesto10,
  importeTotal,
  tipoPedido,
  rucValue,
  razonSocial,
  montoEfectivo,
  montoTarjeta,
  montoCheque,
  total,
  vuelto,
  items = [],
}) => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });

  return (
    <Box flex="50%" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-evenly" gap={3} sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('nroPedido')}
          </InputLabel>
          <OutlinedInput
            disabled
            inputProps={{
              min: 0,
            }}
            size="small"
            label={t('nroPedido')}
            value={nroPedido}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('fecha')}
          </InputLabel>
          <OutlinedInput
            disabled
            inputProps={{
              min: 0,
            }}
            size="small"
            label={t('fecha')}
            value={formateDate(fecha)}
          />
        </FormControl>
      </Box>

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
            <Checkbox sx={{ padding: 0.5 }} value={exentoIVA} disabled />
            <Typography sx={{ fontWeight: 500 }}>{t('exentoIva')}</Typography>
          </Box>
          <Box display="flex">
            <Typography sx={{ fontWeight: 500 }}>
              Iva 5%: {formatCurrency(exentoIVA ? 0 : impuesto5)}
            </Typography>
            <Typography sx={{ ml: 2, fontWeight: 500 }}>
              Iva 10%: {formatCurrency(exentoIVA ? 0 : impuesto10)}
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
            disabled
          >
            {TipoPedidoArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sx={{ pl: 1 }}>
          <TextField fullWidth label={t('ruc')} value={rucValue} disabled />
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            InputProps={{}}
            label={t('razonSocial')}
            value={razonSocial}
            disabled
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-evenly" gap={3} sx={{ my: 4 }}>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('efectivo')}
          </InputLabel>
          <OutlinedInput
            disabled
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
            value={montoEfectivo}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('tarjeta')}
          </InputLabel>
          <OutlinedInput
            disabled
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
            value={montoTarjeta}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            {t('cheque')}
          </InputLabel>
          <OutlinedInput
            disabled
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
            value={montoCheque}
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
          {`${t('total')}: ${formatCurrency(total)}`}
        </Typography>

        <Typography
          sx={{ flex: 1, fontSize: 18, fontWeight: 800, textAlign: 'center' }}
        >
          {`${t('vuelto')}: ${formatCurrency(vuelto)}`}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
          Items
        </Typography>

        <List dense>
          {items.map((detalle) => (
            <ListItem key={detalle._id}>
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                sx={{ width: '100%' }}
              >
                <Stack flex={1}>
                  <Typography variant="body2">{`${detalle.articulo.codigo} - ${detalle.articulo.descripcion}`}</Typography>
                  <Typography variant="subtitle1">
                    {`${t('cantidad')} : ${detalle.cantidad}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`${t('precioUnitario')} : ${formatCurrency(
                      detalle.precioUnitario
                    )}`}
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight={800}>
                  {`${formatCurrency(
                    detalle.cantidad * detalle.precioUnitario
                  )}`}
                </Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

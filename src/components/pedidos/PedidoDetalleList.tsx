import { useMemo } from 'react';

import {
  AddOutlined as AddIcon,
  ContentPasteOffOutlined as EmptyIcon,
  RemoveOutlined as MinusIcon,
} from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { usePedidosProvider } from '@lib/hooks';
import { formatCurrency } from 'src/utils';

export const PedidoDetalleList = () => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });

  const { getDetalle, updateCantidad, removeArticuloFromDetalle } =
    usePedidosProvider();

  const detallePedido = useMemo(() => getDetalle(), [getDetalle]);

  return (
    <Box display="flex" flexDirection="column" flex="50%">
      <Typography variant="h5" component={'div'}>
        {t('title')}
      </Typography>

      {detallePedido.length > 0 ? (
        detallePedido.map((detalle) => (
          <Stack
            key={detalle.articulo._id}
            direction="row"
            alignItems="center"
            gap={2}
            sx={{ mt: 2 }}
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                disabled={detalle.cantidad === 1}
                onClick={() => updateCantidad(detalle, -1)}
                aria-label="delete"
              >
                <MinusIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ ml: 1, mr: 1 }}>{detalle.cantidad}</Typography>
              <IconButton
                aria-label="delete"
                onClick={() => updateCantidad(detalle, 1)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Stack flex={1}>
              <Typography variant="body2">{`${detalle.codigo} - ${detalle.descripcion}`}</Typography>
              <Typography variant="subtitle1">
                {`${t('precioUnitario')} : ${formatCurrency(
                  detalle.precioUnitario
                )}`}
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={800}>
              {`${formatCurrency(detalle.cantidad * detalle.precioUnitario)}`}
            </Typography>
            <IconButton
              aria-label="delete"
              style={{
                backgroundColor: '#f44336',
                color: 'white',
              }}
              onClick={() => removeArticuloFromDetalle(detalle)}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <EmptyIcon sx={{ fontSize: 100, color: '#EAEAEA' }} />
          <Typography
            variant="h5"
            component={'div'}
            sx={{ textAlign: 'center', width: 300, color: '#CBCBCB' }}
          >
            {t('emptyDetail')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

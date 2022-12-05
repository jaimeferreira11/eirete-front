import { useMemo } from 'react';

import {
  AddOutlined as AddIcon,
  ContentPasteOffOutlined as EmptyIcon,
  RemoveOutlined as MinusIcon,
} from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { useEnvioProvider } from '@lib/hooks';

export const EnvioDetalleList = () => {
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'detalleEnvio',
  });

  const { getDetalle, removeArticuloFromDetalle, updateCantidad } =
    useEnvioProvider();

  const detallePedido = useMemo(() => getDetalle(), [getDetalle]);

  return (
    <Box display="flex" flexDirection="column" flex="80%">
      <Typography variant="h5" component={'div'} style={{ fontWeight: 'bold' }}>
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
                disabled={detalle.enviado === 1}
                onClick={() => updateCantidad(detalle, -1)}
                aria-label="delete"
              >
                <MinusIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ ml: 1, mr: 1 }}>{detalle.enviado}</Typography>
              <IconButton
                aria-label="delete"
                onClick={() => updateCantidad(detalle, 1)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Stack flex={1}>
              <Typography variant="body2">{`${detalle.articulo.codigo} - ${detalle.articulo.descripcion}`}</Typography>
            </Stack>

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

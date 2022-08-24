import { FC } from 'react';

import { IStockArticuloSucursal } from '@core/interfaces';

import { usePedidosProvider } from '@lib/hooks';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { formatCurrency } from 'src/utils';

interface Props {
  item: IStockArticuloSucursal;
}

export const ArticuloPedidoView: FC<Props> = ({ item }) => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'articulos' });
  const { setArticuloDetalle } = usePedidosProvider();

  const hasStock = item.stock > 0;

  return (
    <Box
      gridColumn="span 12"
      display="flex"
      justifyContent="space-between"
      gap={2}
      key={item._id}
      sx={{
        p: 1,
        border: '1px solid #EAEAEA',
        borderRadius: 2,
      }}
      component={IconButton}
      onClick={() =>
        hasStock ? setArticuloDetalle(item.articulo, item.stock) : null
      }
    >
      <Typography variant="subtitle1" sx={{ color: '#2C2C2C' }}>
        {item.articulo.codigo} - {item.articulo.descripcion}
      </Typography>
      <Box display={'flex'} alignItems="center" gap={2}>
        <Typography variant="subtitle1" sx={{ color: '#2C2C2C' }}>
          {formatCurrency(item.articulo.precioVenta)}
        </Typography>
        {!hasStock && (
          <Chip color="error" label={t('sinStock')} variant="outlined" />
        )}
      </Box>
    </Box>
  );
};

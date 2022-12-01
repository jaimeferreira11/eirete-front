import { FC } from 'react';

import { IStockArticuloSucursal } from '@core/interfaces';

import { Box, Chip, IconButton, Typography } from '@mui/material';
import { formatCurrency } from 'src/utils';

interface Props {
  articulo: IStockArticuloSucursal;
}

export const ArticuloViewEnvio: FC<Props> = ({ articulo }) => {
  const onSelect = () => {};
  const hasStock = articulo.stock > 0;
  return (
    <Box
      gridColumn="span 12"
      display="flex"
      justifyContent="space-between"
      key={articulo._id}
      sx={{
        p: 1,
        border: '1px solid #EAEAEA',
        borderRadius: 2,
      }}
      component={IconButton}
      onClick={() => (hasStock ? onSelect() : null)}
    >
      <Typography variant="subtitle1" sx={{ color: '#2C2C2C' }}>
        {articulo.articulo.codigo} - {articulo.articulo.descripcion}
      </Typography>
      <Box display={'flex'} alignItems="center" gap={2}>
        <Typography variant="subtitle1" sx={{ color: '#2C2C2C' }}>
          {formatCurrency(articulo.articulo.precioVenta)}
        </Typography>
        {!hasStock && (
          <Chip color="error" label={'Sin stock'} variant="outlined" />
        )}
      </Box>
    </Box>
  );
};

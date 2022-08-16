import { Box } from '@mui/material';
import { ArticulosPedidoView } from './ArticulosPedidoView';

import { PedidoDetalleView } from './PedidoDetalleView';

export const PedidoTab = () => {
  return (
    <Box display="flex" flex="100%" sx={{ mt: 2 }}>
      <ArticulosPedidoView />
      <PedidoDetalleView />
    </Box>
  );
};

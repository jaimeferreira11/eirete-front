import { Box } from '@mui/material';

import { PedidoDetalleList } from './PedidoDetalleList';
import { PedidoSummary } from './PedidoSummary';

export const PedidoDetalleView = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="55%"
      justifyContent="space-between"
      sx={{ pl: 2, pr: 2, overflow: 'auto' }}
    >
      <PedidoDetalleList />
      <PedidoSummary />
    </Box>
  );
};

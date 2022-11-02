import { useState } from 'react';

import { Box } from '@mui/material';

import { PedidoDetalleList } from './PedidoDetalleList';
import { PedidoDireccionModal } from './pedidoModal/PedidoDireccionModal';
import { PedidoSummary } from './PedidoSummary';

export const PedidoDetalleView = () => {
  const [direccionModalState, setDireccionModalState] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="55%"
      justifyContent="space-between"
      sx={{ pl: 2, pr: 2, overflow: 'auto' }}
    >
      {direccionModalState && (
        <PedidoDireccionModal
          handleClose={() => setDireccionModalState(false)}
          show={direccionModalState}
        />
      )}

      <PedidoDetalleList />
      <PedidoSummary handleEditDireccion={() => setDireccionModalState(true)} />
    </Box>
  );
};

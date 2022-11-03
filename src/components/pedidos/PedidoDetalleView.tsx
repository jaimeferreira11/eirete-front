import { useState } from 'react';

import { Box } from '@mui/material';

import { PedidoDetalleList } from './PedidoDetalleList';
import { PedidoDireccionModal } from './pedidoModal/PedidoDireccionModal';
import { SearchClienteModal } from './pedidoModal/SearchClienteModal';
import { PedidoSummary } from './PedidoSummary';

export const PedidoDetalleView = () => {
  const [direccionModalState, setDireccionModalState] = useState(false);
  const [clienteSearchModal, setClienteSearchModal] = useState(false);

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

      {clienteSearchModal && (
        <SearchClienteModal
          handleClose={() => setClienteSearchModal(false)}
          show={clienteSearchModal}
        />
      )}

      <PedidoDetalleList />
      <PedidoSummary
        handleEditDireccion={() => setDireccionModalState(true)}
        handleSearchCliente={() => setClienteSearchModal(true)}
      />
    </Box>
  );
};

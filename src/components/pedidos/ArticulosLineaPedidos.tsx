import React, { FC } from 'react';

import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useStockArticulosLineasSucursal } from '@lib/hooks';

import { ArticuloPedidoView } from './ArticuloPedidoView';

interface Props {
  lineaId: string;
  sucursalId: string;
  children?: React.ReactNode;
}

export const ArticulosLineaPedidos: FC<Props> = ({ lineaId, sucursalId }) => {
  const { isLoading, articulos } = useStockArticulosLineasSucursal(
    sucursalId,
    lineaId
  );

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (articulos?.length === 0)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        sx={{ textAlign: 'center' }}
      >
        <Typography>Sin articulos para esta línea</Typography>
        <RemoveShoppingCartOutlinedIcon sx={{ color: '#2C2C2C' }} />
      </Box>
    );
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      {articulos?.map((articulo) => (
        <ArticuloPedidoView key={articulo._id} item={articulo} />
      ))}
    </Box>
  );
};

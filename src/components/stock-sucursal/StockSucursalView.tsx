import { FC } from 'react';

import { IStockArticuloSucursal } from '@core/interfaces';

import { useStockSucursalProvider } from '@lib/hooks/providers/useStockSucursalProvider';
import { Box, IconButton, Typography } from '@mui/material';
import { KeyedMutator } from 'swr';

interface Props {
  articulo: IStockArticuloSucursal;
  refMutate?: KeyedMutator<IStockArticuloSucursal[]> | undefined;
}

export const StockSucursalView: FC<Props> = ({ articulo, refMutate }) => {
  const { setStockSucursalSelected } = useStockSucursalProvider();

  const onSelect = () => setStockSucursalSelected(articulo, refMutate);

  return (
    <Box
      gridColumn="span 6"
      key={articulo._id}
      sx={{
        p: 1,
        border: '1px solid #EAEAEA',
        borderRadius: 2,
      }}
      component={IconButton}
      onClick={onSelect}
    >
      <Typography variant="subtitle1" sx={{ color: '#2C2C2C' }}>
        {articulo.articulo.codigo} - {articulo.articulo.descripcion}
      </Typography>
    </Box>
  );
};

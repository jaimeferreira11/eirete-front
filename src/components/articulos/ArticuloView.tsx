import { FC } from 'react';

import { IArticulo } from '@core/interfaces';
import { useArticulosProvider } from '@lib/hooks';

import { Box, IconButton, Typography } from '@mui/material';
import { KeyedMutator } from 'swr';

interface Props {
  articulo: IArticulo;
  refMutate: KeyedMutator<IArticulo[]>;
}

export const ArticuloView: FC<Props> = ({ articulo, refMutate }) => {
  const { setArticuloSelected } = useArticulosProvider();

  const onSelect = () => setArticuloSelected(articulo, refMutate);

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
        {articulo.descripcion}
      </Typography>
    </Box>
  );
};

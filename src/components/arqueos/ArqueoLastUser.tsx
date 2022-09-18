import { Box, Typography } from '@mui/material';

import { FullScreenLoading } from '@components/ui';
import { useArqueoLastUser } from '@lib/hooks';
import { ArqueoDetalleInfo } from './ArqueoDetalleInfo';

export const ArqueoLastUser = () => {
  const { arqueo, isLoading, isError } = useArqueoLastUser();

  if (isLoading)
    return (
      <Box display="flex" flexDirection="column" flex="100%" sx={{ mt: 2 }}>
        <FullScreenLoading />
      </Box>
    );

  if (isError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        flex="100%"
        sx={{ mt: 2 }}
      >
        <Typography variant="h4">Error cargando datos</Typography>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="column" flex="100%" sx={{ mt: 2 }}>
      <ArqueoDetalleInfo arqueo={arqueo!} />
    </Box>
  );
};

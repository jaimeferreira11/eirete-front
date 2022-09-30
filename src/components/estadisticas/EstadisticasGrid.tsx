import { Box } from '@mui/material';
import { EstadisticasDataGrid } from './EstadisticasDataGrid';
import { EstadisticasView } from './EstadisticasView';

export const EstadisticasGrid = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100%', p: 4 }}>
      <EstadisticasView />

      <EstadisticasDataGrid />
    </Box>
  );
};

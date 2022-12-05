import { useEnvioProvider } from '@lib/hooks';
import { Box, Typography } from '@mui/material';

const EnvioRealizadoView = () => {
  const { envioRealizado } = useEnvioProvider();

  if (!envioRealizado) return null;
  return (
    <Box sx={{ p: 2, mb: 1, border: '0.1em solid #EAEAEA' }}>
      <Typography variant="h4" fontWeight={500}>
        Código de envio: {envioRealizado.codigo}
      </Typography>
    </Box>
  );
};

export default EnvioRealizadoView;

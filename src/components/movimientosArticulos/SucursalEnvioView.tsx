import { useCallback, useState } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useEnvioProvider, useUtilsProvider } from '@lib/hooks';

const SucursalEnvioView = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { showSnackbar } = useUtilsProvider();
  const {
    sucursalesPosibles,
    setSucursalDestino,
    newEnvio,
    resetEnvio,
    realizarEnvio,
  } = useEnvioProvider();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSucursalDestino(event.target.value);
  };

  const handleEnviarStock = useCallback(async () => {
    setIsSaving(true);
    const result = await realizarEnvio();

    if (!result.hasError) {
      showSnackbar({
        message: 'Envio realizado exitosamente',
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      resetEnvio();
    } else {
      showSnackbar({
        message: result.message || 'Ocurrió un error al realizar el envio',
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  }, [realizarEnvio, resetEnvio, showSnackbar]);

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ width: '100%' }}>
        <TextField
          select
          size="small"
          label={'Destino del envio'}
          fullWidth
          onChange={handleChange}
          value={newEnvio.sucursalDestino || ''}
        >
          <MenuItem key={'empty'} value={''}></MenuItem>
          {sucursalesPosibles?.map((sucursal) => (
            <MenuItem key={sucursal._id} value={sucursal._id}>
              {sucursal.descripcion}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box display="flex" gap={2} sx={{ mt: 2 }}>
        <Button
          disabled={isSaving}
          onClick={resetEnvio}
          color="error"
          sx={{ flex: 1 }}
        >
          Cancelar
        </Button>
        <Button
          disabled={
            !newEnvio.sucursalDestino ||
            newEnvio.detalles.length === 0 ||
            isSaving
          }
          color="success"
          sx={{ flex: 1 }}
          onClick={handleEnviarStock}
        >
          {!isSaving && (
            <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          )}

          {isSaving ? (
            <CircularProgress size="25px" color="info" />
          ) : (
            <Typography>Enviar</Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SucursalEnvioView;

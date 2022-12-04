import { FC, useCallback, useState } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useEnvioProvider, useUtilsProvider } from '@lib/hooks';

interface Props {
  imprimirPdf: () => Promise<void>;
  children?: React.ReactNode;
}

const SucursalEnvioView: FC<Props> = ({ imprimirPdf }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { showSnackbar } = useUtilsProvider();
  const {
    sucursalesPosibles,
    setSucursalDestino,
    newEnvio,
    resetEnvio,
    realizarEnvio,
    getCantidadTotalArticulos,
  } = useEnvioProvider();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSucursalDestino(event.target.value);
  };

  const handleEnviarStock = useCallback(async () => {
    setIsSaving(true);
    const result = await realizarEnvio();

    if (!result.hasError) {
      // TODO: descargar el pdf EnviarRecibirModal con el envio retornado del endpoint(debe mostrar el codigo)
      showSnackbar({
        message: 'Envio realizado exitosamente',
        type: 'success',
        show: true,
      });

      setTimeout(async () => {
        await imprimirPdf();
        resetEnvio();
      }, 1500);
      setIsSaving(false);
    } else {
      showSnackbar({
        message: result.message || 'Ocurrió un error al realizar el envio',
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  }, [imprimirPdf, realizarEnvio, resetEnvio, showSnackbar]);

  return (
    <Box>
      <Grid
        container
        sx={{
          borderTop: '0.1em solid #EAEAEA',
          borderBottom: '0.1em solid #EAEAEA',
          pt: 1,
        }}
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <Typography style={{ fontWeight: 'bold' }}>
            Destino de envío
          </Typography>
          <TextField
            select
            size="small"
            label={''}
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
        </Grid>

        <Grid item xs={4}>
          <Box display="flex" sx={{ pt: 3 }}>
            <Typography style={{ fontWeight: 'bold' }}>
              Total de artículos:
            </Typography>
            <Typography
              variant="h4"
              sx={{ pl: 1 }}
              style={{ fontWeight: 'bold' }}
            >
              {getCantidadTotalArticulos().toString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" gap={2} sx={{ mb: 6, mt: 2 }}>
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

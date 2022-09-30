import { FullScreenLoading } from '@components/ui';
import {
  useEstadisticasProvider,
  useEstadisticasSucursal,
  useSucursal,
} from '@lib/hooks';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent } from 'react';
import { formatCurrency } from 'src/utils';
import { EstadisticasFilterModal } from './EstadisticasFilterModal';

export const EstadisticasView = () => {
  const { t } = useTranslation('estadisticas');

  const { sucursalId, fechaDesdeFilter, fechaHastaFilter, setSucursalId } =
    useEstadisticasProvider();
  const { estadisticas, isLoading, isError } = useEstadisticasSucursal(
    fechaDesdeFilter,
    fechaHastaFilter,
    sucursalId
  );
  const { sucursales } = useSucursal();
  return (
    <Box flex={0.3} display="flex">
      {isLoading ? (
        <Box flex={1}>
          <FullScreenLoading />
        </Box>
      ) : (
        <Box display="flex" flex={1}>
          <Box display="flex" flexDirection="column" flex={1}>
            <Typography variant="h1">{t('title')}</Typography>

            {isError || !estadisticas ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex={1}
              >
                <Typography variant="h2">{t('errorEstadisticas')}</Typography>
              </Box>
            ) : (
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>
                      <b>{t('cantPedidos')}</b>{' '}
                      {formatCurrency(estadisticas?.cantPedidos || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('cantidadArticulos')}</b>{' '}
                      {formatCurrency(estadisticas.cantArticulos || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoTotalEfectivo')}</b>{' '}
                      {formatCurrency(estadisticas.montoTotalEfectivo || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoPromedioEfectivo')}</b>{' '}
                      {formatCurrency(estadisticas.montoPromedioEfectivo || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoTotalDeposito')}</b>{' '}
                      {formatCurrency(estadisticas.montoTotalDeposito || 0)}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>
                      <b>{t('montoTotalDeposito')}</b>{' '}
                      {formatCurrency(estadisticas.montoPromedioDeposito || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoPromedioVuelto')}</b>{' '}
                      {formatCurrency(estadisticas.montoPromedioVuelto || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoTotalVendido')}</b>{' '}
                      {formatCurrency(estadisticas.montoTotalVendido || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('montoTotalVendido')}</b>{' '}
                      {formatCurrency(estadisticas.montoTotalVendido || 0)}
                    </Typography>

                    <Typography>
                      <b>{t('ventaPromedio')}</b>{' '}
                      {formatCurrency(estadisticas?.ventaPromedio || 0)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      )}

      <Box flex={1} display="flex" alignItems={'flex-start'}>
        <EstadisticasFilterModal />
        <TextField
          select
          value={sucursalId}
          onChange={({
            target,
          }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setSucursalId(target.value)
          }
          label={t('sucursal')}
          sx={{ flex: 1 }}
        >
          <MenuItem value="all">Todas las surcursales</MenuItem>
          {sucursales &&
            sucursales.map((sucursal) => (
              <MenuItem key={sucursal._id} value={sucursal._id}>
                {sucursal.descripcion}
              </MenuItem>
            ))}
        </TextField>
      </Box>
    </Box>
  );
};

import { FC } from 'react';

import { IArqueo } from '@core/interfaces';

import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { formatCurrency, formateDate } from 'src/utils';

interface Props {
  arqueo: IArqueo;
  children?: React.ReactNode;
}

export const ArqueoDetalleInfo: FC<Props> = ({ arqueo }) => {
  const { t } = useTranslation('arqueos', { keyPrefix: 'detalleArqueo' });

  return (
    <Grid
      container
      sx={{
        border: '0.1em solid #EAEAEA',
        p: 2,
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '0.1em solid #EAEAEA',
        }}
      >
        <Typography
          variant="h2"
          fontWeight={500}
          sx={{ py: 2, borderBottom: '0.1em solid #EAEAEA' }}
        >
          Datos Generales
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ py: 2, pr: 4 }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('sucursal')}:</b>{' '}
            </Typography>
            <Typography>{arqueo?.sucursal.descripcion}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('fechaApertura')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.fechaAlta && formateDate(arqueo?.fechaAlta)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('fechaCierre')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.turno?.fechaCierre &&
                formateDate(arqueo?.turno?.fechaCierre)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('abiertoPor')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.usuarioAlta && arqueo?.usuarioAlta.username}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('cerradoPor')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.usuarioModif && arqueo?.usuarioModif.username}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('totalEfectivo')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.totalEfectivo && formatCurrency(arqueo?.totalEfectivo)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('totalDeposito')}</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.totalDeposito && formatCurrency(arqueo?.totalDeposito)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('pedidosRealizados')}</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.pedidosRealizados && arqueo.pedidosRealizados.length}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              <b>{t('pedidosCancelados')}:</b>{' '}
            </Typography>
            <Typography>
              {arqueo?.pedidosCancelados && arqueo.pedidosCancelados.length}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography
            variant="h2"
            fontWeight={500}
            sx={{ px: 4, py: 2, borderBottom: '0.1em solid #EAEAEA' }}
          >
            Dinero
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ py: 2, px: 4 }}
          >
            {arqueo?.monedas.map((moneda) => (
              <Box
                key={moneda._id}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="h5" sx={{}}>
                  <b>
                    {t('monedas')} {moneda.descripcion}:
                  </b>
                </Typography>
                <Typography>{moneda.cantidad}</Typography>
              </Box>
            ))}

            {arqueo?.billetes.map((billete) => (
              <Box
                key={billete._id}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="h5" sx={{}}>
                  <b>
                    {t('billetes')} {billete.descripcion}:
                  </b>
                </Typography>
                <Typography>{billete.cantidad}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

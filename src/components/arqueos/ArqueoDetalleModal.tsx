import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { IArqueo } from '@core/interfaces';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { formatCurrency, formateDate } from 'src/utils';

interface Props {
  show: boolean;
  item?: IArqueo;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const ArqueoDetalleModal: FC<Props> = ({ show, handleClose, item }) => {
  const { t } = useTranslation('arqueos', { keyPrefix: 'detalleArqueo' });

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root': {
          padding: 2,
        },
        '& .MuiDialogActions-root': {
          padding: 1,
        },
      }}
      fullWidth
      maxWidth="lg"
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>{}</DialogTitle>
      <DialogContent style={{ maxHeight: '80vh' }}>
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
                <Typography>{item?.sucursal.descripcion}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('fechaApertura')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.fechaAlta && formateDate(item?.fechaAlta)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('fechaCierre')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.turno?.fechaCierre &&
                    formateDate(item?.turno?.fechaCierre)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('abiertoPor')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.usuarioAlta && item?.usuarioAlta.username}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('cerradoPor')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.usuarioModif && item?.usuarioModif.username}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('totalEfectivo')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.totalEfectivo && formatCurrency(item?.totalEfectivo)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('totalDeposito')}</b>{' '}
                </Typography>
                <Typography>
                  {item?.totalDeposito && formatCurrency(item?.totalDeposito)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('pedidosRealizados')}</b>{' '}
                </Typography>
                <Typography>
                  {item?.pedidosRealizados && item.pedidosRealizados.length}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">
                  <b>{t('pedidosCancelados')}:</b>{' '}
                </Typography>
                <Typography>
                  {item?.pedidosCancelados && item.pedidosCancelados.length}
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
                {item?.monedas.map((moneda) => (
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

                {item?.billetes.map((billete) => (
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
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          <Typography>{t('volver')}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

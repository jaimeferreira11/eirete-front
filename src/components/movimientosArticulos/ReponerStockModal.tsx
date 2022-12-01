import { FC, useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

import { IArticuloMovimiento } from '@core/interfaces';

import { useEnvioProvider, useUtilsProvider } from '@lib/hooks';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { formateDate } from 'src/utils';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  envio?: IArticuloMovimiento;
}

export const ReponerStockModal: FC<Props> = ({
  open,
  handleClose,
  envio = undefined,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { showSnackbar } = useUtilsProvider();
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'listado',
  });

  const { reponerStock } = useEnvioProvider();

  const handleReponerStock = useCallback(async () => {
    if (!envio) return;
    setIsSaving(true);
    const result = await reponerStock(envio._id);

    if (!result.hasError) {
      showSnackbar({
        message: t('reponerExitoso'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('reponerError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  }, [envio, handleClose, reponerStock, showSnackbar, t]);

  if (!envio) return null;
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
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle></DialogTitle>
      <DialogContent style={{ maxHeight: '450px' }}>
        <Box sx={{ px: 2 }}>
          <Box>
            <Typography>
              <b>{t('fecha')}:</b> {formateDate(envio?.fechaAlta)}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>{t('enviadoPor')}:</b> {envio?.usuarioAlta?.username}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>{t('enviadoDesde')}:</b> {envio?.sucursalOrigen?.descripcion}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>{t('rechazadoPor')}:</b> {envio?.usuarioModif?.username}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>{t('rechazadoDesde')}:</b>{' '}
              {envio?.sucursalDestino?.descripcion}{' '}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Grid container justifyContent="center">
            <Grid container item xs={12} justifyContent="center">
              <Grid item xs={5}>
                <Typography fontWeight={500} textAlign="center">
                  Producto
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight={500} textAlign="center">
                  Cantidad
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight={500} textAlign="center">
                  Recibido
                </Typography>
              </Grid>
            </Grid>

            {envio.detalles.map((detalle) => (
              <Grid
                key={detalle._id}
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={5} sx={{ textAlign: 'center' }}>
                  {detalle.articulo.descripcion}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {detalle.enviado}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {detalle.recibido}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" disabled={isSaving}>
          <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          <Typography>{t('cancelar')}</Typography>
        </Button>
        <Button
          type="submit"
          color="success"
          disabled={isSaving}
          onClick={handleReponerStock}
        >
          {!isSaving && (
            <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
          )}

          {isSaving ? (
            <CircularProgress size="25px" color="info" />
          ) : (
            <Typography>{t('reponerStock')}</Typography>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

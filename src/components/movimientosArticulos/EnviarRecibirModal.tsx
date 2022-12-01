import { ChangeEvent, FC, useCallback, useState } from 'react';

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
  TextField,
  Typography,
} from '@mui/material';

import { IArticuloMovimiento } from '@core/interfaces';

import { EstadoMovimientoArticulo } from '@core/services';
import { useEnvioProvider, useUtilsProvider } from '@lib/hooks';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { debounce } from 'debounce';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { formateDate } from 'src/utils';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  envio?: IArticuloMovimiento;
}

export const EnviarRecibirModal: FC<Props> = ({
  open,
  handleClose,
  envio = undefined,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const { recibirEnvio, rechazarEnvio } = useEnvioProvider();
  const [detalleCambios, setDetalleCambios] = useState<
    {
      _id: string;
      enviado: number;
      recibido: number;
    }[]
  >([]);

  const { showSnackbar } = useUtilsProvider();
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'listado',
  });

  const [codigoValue, setCodigoValue] = useState('');

  const handleCodigoChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCodigoValue(target.value);
  };

  const handleChangeRecibido = (
    _id: string,
    enviado: number,
    recibido: number
  ) => {
    setDetalleCambios((prev) => {
      const restante = prev.filter((envioDetalle) => envioDetalle._id !== _id);
      return [...restante, { _id, enviado, recibido }];
    });
  };

  const calcularSaldos = (_id: string) => {
    if (detalleCambios.length === 0) return true;

    const detalleEncontrado = detalleCambios.find(
      (detalleCambio) => detalleCambio._id === _id
    );

    if (detalleEncontrado)
      return detalleEncontrado.recibido <= detalleEncontrado.enviado;

    return true;
  };

  const checkCantidadesRecibidas = useCallback(() => {
    const checkCantidades = detalleCambios.some(
      (envioDetalle) => envioDetalle.recibido > envioDetalle.enviado
    );

    return !checkCantidades;
  }, [detalleCambios]);

  const handleRecibirPedido = useCallback(async () => {
    if (!envio) return;
    setIsSaving(true);
    let estadoNuevo: EstadoMovimientoArticulo = 'FINALIZADO';
    const bodyEnvio: IArticuloMovimiento = {
      ...envio,
      detalles: envio.detalles.map((detalleOriginal) => {
        const detalleCambiado = detalleCambios.find(
          (detalleCambio) => detalleCambio._id === detalleOriginal._id
        );
        if (!detalleCambiado) {
          estadoNuevo = 'ATENCION';
          return detalleOriginal;
        }

        if (detalleCambiado.recibido < detalleOriginal.enviado)
          estadoNuevo = 'ATENCION';

        return { ...detalleOriginal, recibido: detalleCambiado.recibido };
      })!,
    };
    const result = await recibirEnvio(
      { ...bodyEnvio, estado: estadoNuevo },
      codigoValue
    );

    if (!result.hasError) {
      showSnackbar({
        message: t('recibidoExitoso'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('recibidoError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  }, [
    codigoValue,
    detalleCambios,
    envio,
    handleClose,
    recibirEnvio,
    showSnackbar,
    t,
  ]);

  const handleRechazarEnvio = useCallback(async () => {
    if (!envio) return;
    setIsSaving(true);
    const result = await rechazarEnvio({ ...envio, estado: 'RECHAZADO' });

    if (!result.hasError) {
      showSnackbar({
        message: t('rechazoExitoso'),
        type: 'success',
        show: true,
      });
      setIsSaving(false);
      handleClose();
    } else {
      showSnackbar({
        message: result.message || t('rechazoError'),
        type: 'error',
        show: true,
      });
      setIsSaving(false);
    }
  }, [envio, handleClose, rechazarEnvio, showSnackbar, t]);

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
      onClose={() => {
        handleClose();
        setCodigoValue('');
      }}
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
              <Grid item xs={2}>
                <Typography fontWeight={500} textAlign="center">
                  Recibir
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
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  <NumberFormat
                    label="Recibir"
                    fullWidth
                    error={!calcularSaldos(detalle._id) || undefined}
                    helperText={
                      !calcularSaldos(detalle._id)
                        ? 'Cantidad supera a lo enviado'
                        : ''
                    }
                    disabled={detalle.enviado === detalle.recibido}
                    displayType={'input'}
                    customInput={TextField}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    allowNegative={false}
                    decimalScale={0}
                    onValueChange={debounce(
                      (values: NumberFormatValues) =>
                        handleChangeRecibido(
                          detalle._id,
                          detalle.enviado,
                          values.floatValue || 0
                        ),
                      500
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid
            item
            xs={8}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '16px',
            }}
          >
            <TextField
              label="Código"
              value={codigoValue}
              onChange={handleCodigoChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleRechazarEnvio}
              color="error"
              disabled={isSaving}
            >
              {!isSaving && (
                <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
              )}
              <CloseOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
              {isSaving ? (
                <CircularProgress size="25px" color="info" />
              ) : (
                <Typography>{t('rechazar')}</Typography>
              )}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              color="success"
              disabled={
                isSaving || (!codigoValue && checkCantidadesRecibidas())
              }
              onClick={handleRecibirPedido}
            >
              {!isSaving && (
                <CheckOutlinedIcon sx={{ fontSize: 20, marginRight: '5px' }} />
              )}

              {isSaving ? (
                <CircularProgress size="25px" color="info" />
              ) : (
                <Typography>{t('recibir')}</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

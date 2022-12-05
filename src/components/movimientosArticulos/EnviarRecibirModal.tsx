import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';

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
  IconButton,
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
import { EnvioRechazoModal } from './EnvioRechazoModal';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  envio?: IArticuloMovimiento;
  isOnlyRead?: boolean;
}

export const EnviarRecibirModal: FC<Props> = ({
  open,
  handleClose,
  envio = undefined,
  isOnlyRead = false,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

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
  const printRef = useRef();

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
    const cantidadMayor = detalleCambios.some(
      (envioDetalle) => envioDetalle.recibido > envioDetalle.enviado
    );

    if (cantidadMayor) return true;

    let cantidad = 0;
    detalleCambios.forEach((envioDetalle) => {
      if (!envioDetalle.recibido) envioDetalle.recibido = 0;
      cantidad += envioDetalle.recibido;
    });

    return cantidad === 0;
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

  const [stateCancelationModal, setStateCancelationModal] = useState({
    showMotivo: false,
  });
  const handleRechazarEnvio = useCallback(async () => {
    if (!envio) return;
    setStateCancelationModal({
      showMotivo: true,
    });
  }, [envio]);

  if (!envio) return null;

  return (
    <>
      <EnvioRechazoModal
        handleClose={() => {
          handleClose();
          setStateCancelationModal({ showMotivo: false });
        }}
        showMotivo={stateCancelationModal.showMotivo}
        envio={envio}
      />
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
        <DialogTitle className="dialogTitle">
          <div> </div>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ maxHeight: '450px' }} ref={printRef}>
          <Grid container sx={{ px: 2 }}>
            <Grid item xs={6}>
              <Box justifyContent="space-between" display="flex">
                <Typography>
                  <b>{t('fecha')}:</b>
                </Typography>
                <Typography>{formateDate(envio?.fechaAlta)} </Typography>
              </Box>
              <Box justifyContent="space-between" display="flex">
                <Typography>
                  <b>{t('enviadoPor')}:</b>
                </Typography>
                <Typography>{envio?.usuarioAlta?.username} </Typography>
              </Box>
              <Box justifyContent="space-between" display="flex">
                <Typography>
                  <b>{t('enviadoDesde')}:</b>
                </Typography>
                <Typography>{envio?.sucursalOrigen?.descripcion} </Typography>
              </Box>
              {envio?.estado === 'RECHAZADO' && (
                <Box justifyContent="space-between" display="flex">
                  <Typography>
                    <b>Rechazado por:</b>
                  </Typography>
                  <Typography>{envio?.usuarioModif?.username || ''}</Typography>
                </Box>
              )}
              {envio?.estado === 'RECHAZADO' && (
                <Box justifyContent="space-between" display="flex">
                  <Typography>
                    <b>Rechazado desde:</b>
                  </Typography>
                  <Typography>
                    {envio?.sucursalDestino.descripcion || ''}
                  </Typography>
                </Box>
              )}
              {envio?.estado === 'RECHAZADO' && (
                <Box justifyContent="space-between" display="flex">
                  <Typography>
                    <b>Motivo:</b>
                  </Typography>
                  <Typography>{envio?.obs || ''}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Grid container>
              <Grid
                container
                item
                xs={12}
                sx={{ borderBottom: '0.1em solid #EAEAEA' }}
              >
                <Grid item xs={7}>
                  <Typography fontWeight={500} textAlign="center">
                    ARTÍCULO
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography fontWeight={500} textAlign="end">
                    CANTIDAD
                  </Typography>
                </Grid>

                {isOnlyRead ? (
                  <Grid item xs={2}>
                    <Typography fontWeight={500} textAlign="end">
                      RECIBIDO
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={2}>
                    <Typography fontWeight={500} textAlign="end">
                      RECIBIR
                    </Typography>
                  </Grid>
                )}
              </Grid>

              {envio.detalles.map((detalle) => (
                <Grid
                  key={detalle._id}
                  container
                  item
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ borderBottom: '0.1em solid #EAEAEA' }}
                >
                  <Grid item xs={7} sx={{ fontSize: '14px' }}>
                    {detalle.articulo.descripcion}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ textAlign: 'center', fontSize: '14px' }}
                  >
                    {detalle.enviado}
                  </Grid>
                  {isOnlyRead ? (
                    <Grid
                      item
                      xs={2}
                      sx={{ textAlign: 'center', fontSize: '14px' }}
                    >
                      {detalle.recibido}
                    </Grid>
                  ) : (
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <NumberFormat
                        label=""
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
                        defaultValue={0}
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
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid container style={{ justifyContent: 'flex-end' }}>
            {!isOnlyRead && (
              <Grid
                item
                xs={6}
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
            )}
            {!isOnlyRead && (
              <Grid item xs={2}>
                <Button
                  onClick={handleRechazarEnvio}
                  color="error"
                  sx={{ width: '90%' }}
                  disabled={isRejecting}
                >
                  <CloseOutlinedIcon
                    sx={{ fontSize: 20, marginRight: '5px' }}
                  />
                  {isRejecting ? (
                    <CircularProgress size="25px" color="info" />
                  ) : (
                    <Typography>{t('rechazar')}</Typography>
                  )}
                </Button>
              </Grid>
            )}
            {!isOnlyRead && (
              <Grid item xs={2}>
                <Button
                  type="submit"
                  color="success"
                  sx={{ width: '90%' }}
                  disabled={
                    isSaving || !codigoValue || checkCantidadesRecibidas()
                  }
                  onClick={handleRecibirPedido}
                >
                  {!isSaving && (
                    <CheckOutlinedIcon
                      sx={{ fontSize: 20, marginRight: '5px' }}
                    />
                  )}

                  {isSaving ? (
                    <CircularProgress size="25px" color="info" />
                  ) : (
                    <Typography>{t('recibir')}</Typography>
                  )}
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

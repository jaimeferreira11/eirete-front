import { FC, useMemo, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { IPedidoResponse } from '@core/interfaces';
import { handleDownloadPdf } from 'src/utils';
import { TipoPedido } from '../../../core/interfaces/TipoPedidos';
import { PedidoModalSummary } from './PedidoModalSummary';
import { getImpuestos, getMontosDetalle } from './utils';

interface Props {
  show: boolean;
  item?: IPedidoResponse;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const PedidoDetalleModal: FC<Props> = ({ show, handleClose, item }) => {
  const printRef = useRef();
  const { impuesto10, impuesto5 } = useMemo(
    () => getImpuestos(item?.detalles || []),
    [item?.detalles]
  );

  const { montoCheque, montoEfectivo, montoTarjeta } = useMemo(
    () => getMontosDetalle(item?.metodosPago || []),
    [item?.metodosPago]
  );

  const { t } = useTranslation('pedidos', { keyPrefix: 'detallePedido' });

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
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogContent style={{ maxHeight: '80vh' }} ref={printRef}>
        <PedidoModalSummary
          items={item?.detalles || []}
          nroPedido={item?.nro || 0}
          fecha={item?.fecha || ''}
          exentoIVA={impuesto10 === 0 && impuesto5 === 0}
          impuesto5={impuesto5}
          impuesto10={impuesto10}
          importeTotal={item?.importeTotal || 0}
          tipoPedido={
            (item?.tipoPedido as TipoPedido) || ('REGULAR' as TipoPedido)
          }
          rucValue={
            item?.cliente.persona.ruc || item?.cliente.persona.nroDoc || ''
          }
          razonSocial={item?.cliente.persona.nombreApellido || ''}
          montoEfectivo={montoEfectivo}
          montoTarjeta={montoTarjeta}
          montoCheque={montoCheque}
          total={item?.montoRecibido || 0}
          vuelto={item?.vuelto || 0}
          motivoCancelacion={item?.motivoCancelacion || ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDownloadPdf(printRef, 'Pedido')}>
          <Typography>{t('pdf')}</Typography>
        </Button>
        <Button onClick={handleClose}>
          <Typography>{t('ok')}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { createContext } from 'react';

import {
  IArticuloStock,
  ICliente,
  IEnpointResult,
  TiposPago,
} from '@core/interfaces';
import { TipoPedido } from '@core/interfaces/TipoPedidos';
import { Detalle, INewPedido } from '@lib/interfaces';

interface ContextProps {
  newPedido: INewPedido;

  getDetalle: () => Detalle[];
  getMontoMetodoPago: (tipo: TiposPago) => number;
  getTotal: () => number;
  getVuelto: () => number;
  getImpuesto10: () => number;
  getImpuesto5: () => number;
  isPedidoComplete: () => boolean;
  removeArticuloFromDetalle: (detalle: Detalle) => void;
  resetPedido: () => void;
  searchCliente: (
    nroDocumento: string
  ) => Promise<{ errorMessage?: string; ruc?: string }>;
  setArticuloDetalle: (
    articulo: IArticuloStock,
    stockDisponible: number
  ) => void;
  setCliente: (cliente: ICliente) => void;
  setTipoPedido: (tipoPedido: TipoPedido) => void;
  toogleExtentoIVA: () => void;

  submitPedido: () => Promise<IEnpointResult>;
  updateCantidad: (detalle: Detalle, cantidad: number) => void;
  updateMetodosPago: ({
    descripcion,
    importe,
    referencia,
  }: {
    descripcion: TiposPago;
    importe: number;
    referencia?: string;
  }) => void;
}

export const PedidosContext = createContext({} as ContextProps);

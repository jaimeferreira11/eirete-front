import { createContext } from 'react';

import { IArticuloStock, ICliente } from '@core/interfaces';
import { TipoPedido } from '@core/interfaces/TipoPedidos';
import { Detalle, INewPedido } from '@lib/interfaces';

interface ContextProps {
  newPedido: INewPedido;
  setCliente: (cliente: ICliente) => void;
  setTipoPedido: (tipoPedido: TipoPedido) => void;
  resetPedido: () => void;
  setArticuloDetalle: (
    articulo: IArticuloStock,
    stockDisponible: number
  ) => void;
  getDetalle: () => Detalle[];
  updateCantidad: (detalle: Detalle, cantidad: number) => void;
  removeArticuloFromDetalle: (detalle: Detalle) => void;
  isPedidoComplete: () => boolean;
  getImpuesto10: () => number;
  getImpuesto5: () => number;
}

export const PedidosContext = createContext({} as ContextProps);

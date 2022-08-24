import { IMetodoPago } from '@core/interfaces';
import { Cliente, Detalle, INewPedido } from '@lib/interfaces';
import { TipoPedido } from '../../../core/interfaces/TipoPedidos';
import { PedidosState } from './';

type PedidosType =
  | { type: 'SetSucursalID'; payload: string }
  | { type: 'SetCliente'; payload: Cliente | undefined }
  | { type: 'SetTipoPedido'; payload: TipoPedido }
  | { type: 'ResetPedido'; payload: INewPedido }
  | { type: 'UpdateMontoRecibido'; payload: number }
  | { type: 'UpdateExentoIVA' }
  | { type: 'UpdateRazonSocial'; payload: string }
  | {
      type: 'UpdateMetodosPago';
      payload: { nuevosMetodosPago: IMetodoPago[]; nuevoMontoRecibido: number };
    }
  | {
      type: 'UpdateDetalleAndTotals';
      payload: {
        detalle: Detalle[];
        addAmount: number;
        impuestoAmount: number;
      };
    };

export const pedidosReducer = (
  state: PedidosState,
  action: PedidosType
): PedidosState => {
  switch (action.type) {
    case 'SetSucursalID':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          sucursal: {
            _id: action.payload,
          },
        },
      };
    case 'SetCliente':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          cliente: action.payload,
        },
      };
    case 'SetTipoPedido':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          tipoPedido: action.payload,
        },
      };
    case 'ResetPedido':
      return {
        ...state,
        newPedido: action.payload,
      };
    case 'UpdateDetalleAndTotals':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          detalles: action.payload.detalle,
          importeTotal: state.newPedido.importeTotal + action.payload.addAmount,
          impuesto: state.newPedido.impuesto + action.payload.impuestoAmount,
        },
      };
    case 'UpdateMontoRecibido':
      return {
        ...state,
        newPedido: { ...state.newPedido, montoRecibido: action.payload },
      };
    case 'UpdateExentoIVA':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          exentoIVA: !state.newPedido.exentoIVA,
        },
      };
    case 'UpdateMetodosPago':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          metodosPago: action.payload.nuevosMetodosPago,
          montoRecibido: action.payload.nuevoMontoRecibido,
        },
      };
    default:
      return state;
  }
};

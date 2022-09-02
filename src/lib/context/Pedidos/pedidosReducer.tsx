import { Direccion, IMetodoPago } from '@core/interfaces';
import { Cliente, Detalle, INewPedido } from '@lib/interfaces';
import { TipoPedido } from '../../../core/interfaces/TipoPedidos';
import { PedidosState } from './';

type PedidosType =
  | { type: 'SetSucursalID'; payload: string }
  | {
      type: 'SetCliente';
      payload: {
        cliente: Cliente | undefined;
        direcciones: Direccion[];
        defaultDireccion: Direccion | undefined;
      };
    }
  | { type: 'SetClienteRazonSocial'; payload: string }
  | {
      type: 'UpdateDireccionesCliente';
      payload: {
        direcciones: Direccion[];
        nuevaDireccionDelivery: Direccion;
      };
    }
  | { type: 'SetTipoPedido'; payload: TipoPedido }
  | { type: 'UpdateDireccionEnvio'; payload: Direccion }
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
          cliente: action.payload.cliente,
        },
        direccionesCliente: action.payload.direcciones,
        direccionDelivery: action.payload.defaultDireccion,
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

    case 'SetClienteRazonSocial':
      return {
        ...state,
        newPedido: {
          ...state.newPedido,
          cliente: {
            ...state.newPedido.cliente!,
            persona: {
              ...state.newPedido.cliente?.persona!,
              nombreApellido: action.payload,
            },
          },
        },
      };
    case 'UpdateDireccionesCliente':
      return {
        ...state,
        direccionesCliente: action.payload.direcciones,
        direccionDelivery: action.payload.nuevaDireccionDelivery,
      };
    case 'UpdateDireccionEnvio':
      return {
        ...state,
        direccionDelivery: action.payload,
      };
    default:
      return state;
  }
};

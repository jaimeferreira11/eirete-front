import { IArticuloMovimiento } from '@core/interfaces';
import { IEnvioDetalle } from '@lib/interfaces';
import { ISucursalEnvio, NewEnvioState, NEW_ENVIO_INITIAL_STATE } from '.';

type ArqueoType =
  | {
      type: 'SetNewEnvioOnStart';
      payload: { sucursalOrigen: string };
    }
  | {
      type: 'SetSucursalDestino';
      payload: { sucursalDestino: string };
    }
  | {
      type: 'UpdateDetalles';
      payload: { newDetalle: IEnvioDetalle[] };
    }
  | {
      type: 'SetSucursalesPosibles';
      payload: ISucursalEnvio[];
    }
  | {
      type: 'EnvioRealizado';
      payload: IArticuloMovimiento;
    }
  | {
      type: 'ResetEnvio';
    };

export const enviosReducer = (
  state: NewEnvioState,
  action: ArqueoType
): NewEnvioState => {
  switch (action.type) {
    case 'SetNewEnvioOnStart':
      return {
        ...state,
        newEnvio: {
          sucursalOrigen: action.payload.sucursalOrigen,
          sucursalDestino: '',
          detalles: [],
        },
      };
    case 'SetSucursalDestino':
      return {
        ...state,
        newEnvio: {
          ...state.newEnvio,
          sucursalDestino: action.payload.sucursalDestino,
        },
      };
    case 'UpdateDetalles':
      return {
        ...state,
        newEnvio: {
          ...state.newEnvio,
          detalles: action.payload.newDetalle,
        },
      };
    case 'SetSucursalesPosibles':
      return {
        ...state,
        sucursalesPosibles: action.payload,
      };
    case 'ResetEnvio':
      return NEW_ENVIO_INITIAL_STATE;
    case 'EnvioRealizado':
      return {
        ...state,
        envioRealizado: action.payload,
      };
    default:
      return state;
  }
};

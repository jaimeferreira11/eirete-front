import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';
import { EstadisticasState } from './';

type ArqueoType =
  | { type: 'SetListArqueo'; payload: ListPaginatedResponse<IPedidoResponse> }
  | {
      type: 'UpdateDates';
      payload: { fechaDesde: string; fechaHasta: string };
    }
  | { type: 'UpdateSucursal'; payload: string };

export const estadisticasReducer = (
  state: EstadisticasState,
  action: ArqueoType
): EstadisticasState => {
  switch (action.type) {
    case 'SetListArqueo':
      return {
        ...state,
        pedidosList: action.payload,
      };
    case 'UpdateDates':
      return {
        ...state,
        fechaDesdeFilter: action.payload.fechaDesde,
        fechaHastaFilter: action.payload.fechaHasta,
      };
    case 'UpdateSucursal':
      return {
        ...state,
        sucursalId: action.payload,
      };
    default:
      return state;
  }
};

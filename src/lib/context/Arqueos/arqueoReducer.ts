import { IArqueo, ListPaginatedResponse } from '@core/interfaces';
import { ArqueoState } from './';

type ArqueoType =
  | { type: 'SetListArqueo'; payload: ListPaginatedResponse<IArqueo> }
  | {
      type: 'UpdateDates';
      payload: { fechaDesde: string; fechaHasta: string };
    };

export const arqueoReducer = (
  state: ArqueoState,
  action: ArqueoType
): ArqueoState => {
  switch (action.type) {
    case 'SetListArqueo':
      return {
        ...state,
        arqueosList: action.payload,
      };
    case 'UpdateDates':
      return {
        ...state,
        fechaDesdeFilter: action.payload.fechaDesde,
        fechaHastaFilter: action.payload.fechaHasta,
      };
    default:
      return state;
  }
};

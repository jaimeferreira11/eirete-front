import { ILineaArticulo } from '@core/interfaces';
import { LineasState } from './LineaArticulosProvider';

type LineasType =
  | { type: 'setLineaSelected'; payload: ILineaArticulo }
  | { type: 'loadLineas'; payload: ILineaArticulo[] };

export const lineasReducer = (
  state: LineasState,
  action: LineasType
): LineasState => {
  switch (action.type) {
    case 'setLineaSelected':
      return {
        ...state,
        lineaSelected: action.payload,
      };
    default:
      return state;
  }
};

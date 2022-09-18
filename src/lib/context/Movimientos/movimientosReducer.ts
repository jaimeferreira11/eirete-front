import { IMovimiento } from '@core/interfaces/movimiento';
import { MovimientosState } from './MovimientosProvider';

type MovimientosType =
  | { type: 'setMovimientoSelected'; payload: IMovimiento }
  | { type: 'loadMovimientos'; payload: IMovimiento[] };

export const movimientosReducer = (
  state: MovimientosState,
  action: MovimientosType
): MovimientosState => {
  switch (action.type) {
    case 'setMovimientoSelected':
      return {
        ...state,
        movimientoSelected: action.payload,
      };
    default:
      return state;
  }
};

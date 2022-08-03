import { ICaja } from '@core/interfaces';
import { CajasState } from '.';

type CajasType =
  | { type: 'setCajaSelected'; payload: ICaja }
  | { type: 'loadCajas'; payload: ICaja[] };

export const cajasReducer = (
  state: CajasState,
  action: CajasType
): CajasState => {
  switch (action.type) {
    case 'setCajaSelected':
      return {
        ...state,
        cajaSelected: action.payload,
      };
    default:
      return state;
  }
};

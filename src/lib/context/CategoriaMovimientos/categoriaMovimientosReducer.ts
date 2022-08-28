import { ICategoriaMovimiento } from '@core/interfaces';
import { CategoriaMovimientoState } from './CategoriaMovimientosProvider';

type CategoriasType =
  | { type: 'setCategoriaSelected'; payload: ICategoriaMovimiento }
  | { type: 'loadCtegorias'; payload: ICategoriaMovimiento[] };

export const categoriaMovimientosReducer = (
  state: CategoriaMovimientoState,
  action: CategoriasType
): CategoriaMovimientoState => {
  switch (action.type) {
    case 'setCategoriaSelected':
      return {
        ...state,
        categoriaSelected: action.payload,
      };
    default:
      return state;
  }
};

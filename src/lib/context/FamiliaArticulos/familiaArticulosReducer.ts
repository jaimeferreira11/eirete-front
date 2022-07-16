import { FamiliasState } from '.';
import { IFamiliaArticulo } from '../../../core/interfaces/familiaArticulo';

type FamiliasType =
  | { type: 'setFamiliaSelected'; payload: IFamiliaArticulo }
  | { type: 'loadFamilias'; payload: IFamiliaArticulo[] };

export const familiasReducer = (
  state: FamiliasState,
  action: FamiliasType
): FamiliasState => {
  switch (action.type) {
    case 'setFamiliaSelected':
      return {
        ...state,
        familiaSelected: action.payload,
      };
    default:
      return state;
  }
};

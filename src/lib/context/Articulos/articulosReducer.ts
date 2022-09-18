import { IArticulo } from '@core/interfaces';
import { KeyedMutator } from 'swr';
import { ArticulosState } from './';

type ArticulosType =
  | {
      type: 'SetArticuloSelected';
      payload: {
        articuloSelected: IArticulo;
        mutate: KeyedMutator<IArticulo[]> | undefined;
      };
    }
  | { type: 'ClearArticuloSelected' };

export const articulosReducer = (
  state: ArticulosState,
  action: ArticulosType
): ArticulosState => {
  switch (action.type) {
    case 'SetArticuloSelected':
      return {
        ...state,
        articuloSelected: action.payload.articuloSelected,
        mutate: action.payload.mutate,
      };
    case 'ClearArticuloSelected':
      return {
        ...state,
        articuloSelected: undefined,
        mutate: undefined,
      };
    default:
      return state;
  }
};

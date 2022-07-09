import { ISucursal } from '../../../core/interfaces/sucursal';
import { SucursalesState } from './';

type SucursalesType =
  | { type: 'setSucursalSelected'; payload: ISucursal }
  | { type: 'loadSucursales'; payload: ISucursal[] };

export const sucursalesReducer = (
  state: SucursalesState,
  action: SucursalesType
): SucursalesState => {
  switch (action.type) {
    case 'setSucursalSelected':
      return {
        ...state,
        sucursalSelected: action.payload,
      };
    default:
      return state;
  }
};

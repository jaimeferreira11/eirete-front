import { IStockArticuloSucursal } from '@core/interfaces';
import { KeyedMutator } from 'swr';
import { StockState } from '.';

type StockType =
  | {
      type: 'SetStockSelected';
      payload: {
        stockSelected: IStockArticuloSucursal;
        mutate: KeyedMutator<IStockArticuloSucursal[]> | undefined;
      };
    }
  | { type: 'ClearStockSelected' };

export const stockSucursalReducer = (
  state: StockState,
  action: StockType
): StockState => {
  switch (action.type) {
    case 'SetStockSelected':
      return {
        ...state,
        stockSelected: action.payload.stockSelected,
        mutate: action.payload.mutate,
      };
    case 'ClearStockSelected':
      return {
        ...state,
        stockSelected: undefined,
        mutate: undefined,
      };
    default:
      return state;
  }
};

import { createContext } from 'react';

import { IEnpointResult, IStockArticuloSucursal } from '@core/interfaces';
import { INewArticuloStock } from '@lib/interfaces/NewArticuloStock';
import { KeyedMutator } from 'swr';

interface ContextProps {
  stockSelected: IStockArticuloSucursal | undefined;
  setStockSucursalSelected: (
    stockSelected: IStockArticuloSucursal,
    mutate: KeyedMutator<IStockArticuloSucursal[]> | undefined
  ) => void;
  clearStockSucursalSelected: () => void;
  update: (
    articuloStockUpdated: INewArticuloStock,
    sucursalId: string
  ) => Promise<IEnpointResult>;
}

export const StockSucursalContext = createContext({} as ContextProps);

import { createContext } from 'react';

import { IEnpointResult } from '@core/interfaces';
import { IArticuloStock } from '@core/interfaces/articuloStock';
import { INewArticuloStock } from '@lib/interfaces/NewArticuloStock';
import { KeyedMutator } from 'swr';

interface ContextProps {
  stockSelected: IArticuloStock | undefined;
  setStockSucursalSelected: (
    stockSelected: IArticuloStock,
    mutate: KeyedMutator<IArticuloStock[]> | undefined
  ) => void;
  clearStockSucursalSelected: () => void;
  update: (
    articuloStockUpdated: INewArticuloStock,
    _id: string
  ) => Promise<IEnpointResult>;
}

export const StockSucursalContext = createContext({} as ContextProps);

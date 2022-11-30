import { createContext } from 'react';

import {
  IArticuloMovimiento,
  IEnpointResult,
  IStockArticuloSucursal,
} from '@core/interfaces';
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
  rechazarEnvio: (_envio: IArticuloMovimiento) => Promise<IEnpointResult>;
  recibirEnvio: (
    _envio: IArticuloMovimiento,
    _codigo: string
  ) => Promise<IEnpointResult>;
  reponerStock: (_id: string) => Promise<IEnpointResult>;
}

export const StockSucursalContext = createContext({} as ContextProps);

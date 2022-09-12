import { createContext } from 'react';

import { IEnpointResult, IMovimiento } from '@core/interfaces';

interface ContextProps {
  movimientoSelected: IMovimiento | undefined;
  save: (newSucursal: any) => Promise<IEnpointResult>;
  update: (newSucursal: any, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, movimientos: IMovimiento[]) => void;
}

export const MovimientosContext = createContext({} as ContextProps);

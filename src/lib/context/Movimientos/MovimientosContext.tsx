import { createContext } from 'react';

import { IEnpointResult, IMovimiento } from '@core/interfaces';
import { INewMovimiento } from '@lib/interfaces';

interface ContextProps {
  movimientoSelected: IMovimiento | undefined;
  save: (newSucursal: INewMovimiento) => Promise<IEnpointResult>;
  update: (newSucursal: INewMovimiento, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, movimientos: IMovimiento[]) => void;
}

export const MovimientosContext = createContext({} as ContextProps);

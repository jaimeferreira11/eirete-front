import { createContext } from 'react';

import { IEnpointResult, ISucursal } from '@core/interfaces';
import { INewSucursal } from '@lib/interfaces';

interface ContextProps {
  sucursalSelected: ISucursal | undefined;
  save: (newSucursal: INewSucursal) => Promise<IEnpointResult>;
  update: (newSucursal: INewSucursal, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, sucursales: ISucursal[]) => void;
}

export const SucursalesContext = createContext({} as ContextProps);

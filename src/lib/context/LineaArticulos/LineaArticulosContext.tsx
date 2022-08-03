import { IEnpointResult, ILineaArticulo } from '@core/interfaces';
import { createContext } from 'react';

interface ContextProps {
  lineaSelected: ILineaArticulo | undefined;
  save: (newLinea: any) => Promise<IEnpointResult>;
  update: (newLinea: any, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, lineas: ILineaArticulo[]) => void;
}

export const LineasContext = createContext({} as ContextProps);

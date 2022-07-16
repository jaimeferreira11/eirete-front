import { createContext } from 'react';

import { ICaja, IEnpointResult } from '@core/interfaces';

interface ContextProps {
  cajaSelected: ICaja | undefined;
  save: (newCaja: any) => Promise<IEnpointResult>;
  update: (newCaja: any, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, cajas: ICaja[]) => void;
}

export const CajasContext = createContext({} as ContextProps);

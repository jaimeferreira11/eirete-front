import { ICliente } from '@core/interfaces';
import { ResultRequest } from '@lib/interfaces';
import { createContext } from 'react';

interface ContextProps {
  saveCliente: (
    newCliente: any,
    cliente?: ICliente | undefined
  ) => Promise<ResultRequest>;
}

export const ClienteContext = createContext({} as ContextProps);

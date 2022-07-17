import { ICliente } from '@core/interfaces';
import { ResultRequest } from '@lib/interfaces';
import { createContext } from 'react';

interface ContextProps {
  saveCliente: (
    newCliente: any,
    cliente?: ICliente | undefined
  ) => Promise<ResultRequest>;
  changeStatus: (_id: string, status: boolean) => Promise<ResultRequest>;
}

export const ClienteContext = createContext({} as ContextProps);

import { ICierreCaja } from '@core/interfaces';
import { createContext } from 'react';

interface ContextProps {
  saveArqueoHandler: (
    _newArqueo: ICierreCaja
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const CierreCajaContext = createContext({} as ContextProps);

import { createContext } from 'react';

import { IArticulo, IEnpointResult } from '@core/interfaces';
import { INewArticulo } from '@lib/interfaces';
import { KeyedMutator } from 'swr';

interface ContextProps {
  articuloSelected: IArticulo | undefined;
  setArticuloSelected: (
    articuloSelected: IArticulo,
    mutate: KeyedMutator<IArticulo[]> | undefined
  ) => void;
  clearArticuloSelected: () => void;
  update: (
    articuloUpdated: INewArticulo,
    _id: string
  ) => Promise<IEnpointResult>;
  save: (newArticulo: INewArticulo) => Promise<IEnpointResult>;
}

export const ArticulosContext = createContext({} as ContextProps);

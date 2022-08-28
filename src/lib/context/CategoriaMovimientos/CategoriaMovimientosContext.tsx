import { createContext } from 'react';

import { ICategoriaMovimiento, IEnpointResult } from '@core/interfaces';

interface ContextProps {
  categoriaSelected: ICategoriaMovimiento | undefined;
  save: (newCategoria: any) => Promise<IEnpointResult>;
  update: (newCategoria: any, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, categorias: ICategoriaMovimiento[]) => void;
}

export const CategoriaMovimientosContext = createContext({} as ContextProps);

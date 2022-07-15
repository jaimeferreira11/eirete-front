import { IEnpointResult, IFamiliaArticulo } from '@core/interfaces';
import { INewFamiliaArticulo } from '@lib/interfaces';
import { createContext } from 'react';


interface ContextProps {
  familiaSelected: IFamiliaArticulo | undefined;
  save: (newFamilia: INewFamiliaArticulo) => Promise<IEnpointResult>;
  update: (newFamilia: INewFamiliaArticulo, _id: string) => Promise<IEnpointResult>;
  getById: (_id: string, familias: IFamiliaArticulo[]) => void;
}

export const FamiliasContext = createContext({} as ContextProps);

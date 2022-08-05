import { FC, PropsWithChildren, useCallback, useReducer } from 'react';

import { IArticulo, IEnpointResult } from '@core/interfaces';

import eireteApi from '@core/api';
import { INewArticulo } from '@lib/interfaces';
import { AxiosError } from 'axios';

import { KeyedMutator, mutate } from 'swr';
import { ArticulosContext, articulosReducer } from './';

export interface ArticulosState {
  articuloSelected: IArticulo | undefined;
  mutate: KeyedMutator<IArticulo[]> | undefined;
}

const ARTICULOS_INITIAL_STATE: ArticulosState = {
  articuloSelected: undefined,
  mutate: undefined,
};

export const ArticulosProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(
    articulosReducer,
    ARTICULOS_INITIAL_STATE
  );

  const setArticuloSelected = (
    articuloSelected: IArticulo,
    mutate: KeyedMutator<IArticulo[]> | undefined
  ) =>
    dispatch({
      type: 'SetArticuloSelected',
      payload: { articuloSelected, mutate },
    });

  const clearArticuloSelected = useCallback(() => {
    dispatch({ type: 'ClearArticuloSelected' });
  }, []);

  const update = async (
    articuloUpdated: INewArticulo,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/articulos/${_id}`, {
        ...articuloUpdated,
        lineaArticulo: { _id: articuloUpdated.lineaArticulo },
      });

      if (state.mutate) state.mutate();

      return {
        hasError: false,
      };
    } catch (error) {
      return {
        hasError: true,
        message: (error as AxiosError).message,
      };
    }
  };

  const save = async (newArticulo: INewArticulo): Promise<IEnpointResult> => {
    try {
      await eireteApi.post(`/articulos`, {
        ...newArticulo,
        lineaArticulo: {
          _id: newArticulo.lineaArticulo,
        },
      });

      if (state.mutate) state.mutate();
      mutate(`/articulos?estado=true&linea=${newArticulo.lineaArticulo}`);
      return {
        hasError: false,
      };
    } catch (error) {
      return {
        hasError: true,
        message: (error as AxiosError).message,
      };
    }
  };

  return (
    <ArticulosContext.Provider
      value={{
        ...state,
        setArticuloSelected,
        clearArticuloSelected,
        update,
        save,
      }}
    >
      {children}
    </ArticulosContext.Provider>
  );
};

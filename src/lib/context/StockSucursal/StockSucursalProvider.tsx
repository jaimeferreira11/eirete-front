import { FC, PropsWithChildren, useCallback, useReducer } from 'react';

import { IEnpointResult } from '@core/interfaces';

import eireteApi from '@core/api';
import { AxiosError } from 'axios';

import { IArticuloStock } from '@core/interfaces/articuloSucursal';
import { INewArticuloStock } from '@lib/interfaces/NewArticuloStock';
import { KeyedMutator } from 'swr';
import { StockSucursalContext, stockSucursalReducer } from '.';

export interface StockState {
  stockSelected: IArticuloStock | undefined;
  mutate: KeyedMutator<IArticuloStock[]> | undefined;
}

const ARTICULOS_INITIAL_STATE: StockState = {
  stockSelected: undefined,
  mutate: undefined,
};

export const StockSucursalProvider: FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    stockSucursalReducer,
    ARTICULOS_INITIAL_STATE
  );

  const setStockSucursalSelected = (
    stockSelected: IArticuloStock,
    mutate: KeyedMutator<IArticuloStock[]> | undefined
  ) =>
    dispatch({
      type: 'SetStockSelected',
      payload: { stockSelected, mutate },
    });

  const clearStockSucursalSelected = useCallback(() => {
    dispatch({ type: 'ClearStockSelected' });
  }, []);

  const update = async (
    articuloUpdated: INewArticuloStock,
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

  return (
    <StockSucursalContext.Provider
      value={{
        ...state,
        setStockSucursalSelected,
        clearStockSucursalSelected,
        update,
      }}
    >
      {children}
    </StockSucursalContext.Provider>
  );
};

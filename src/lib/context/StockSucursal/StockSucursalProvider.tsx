import { FC, PropsWithChildren, useCallback, useReducer } from 'react';

import { IEnpointResult, IStockArticuloSucursal } from '@core/interfaces';

import eireteApi from '@core/api';
import { AxiosError } from 'axios';

import { INewArticuloStock } from '@lib/interfaces/NewArticuloStock';
import { KeyedMutator } from 'swr';
import { StockSucursalContext, stockSucursalReducer } from '.';

export interface StockState {
  stockSelected: IStockArticuloSucursal | undefined;
  sucursalIdSelected: string | undefined;
  mutate: KeyedMutator<IStockArticuloSucursal[]> | undefined;
}

const ARTICULOS_INITIAL_STATE: StockState = {
  stockSelected: undefined,
  sucursalIdSelected: undefined,
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
    stockSelected: IStockArticuloSucursal,
    mutate: KeyedMutator<IStockArticuloSucursal[]> | undefined
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
    sucursalId: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/stock/${sucursalId}`, {
        ...articuloUpdated,
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

  const setSucursalIdSelected = (sucursalIdSelected: string) =>
    dispatch({
      type: 'SetSucursalIdSelected',
      payload: { sucursalIdSelected },
    });

  return (
    <StockSucursalContext.Provider
      value={{
        ...state,
        setStockSucursalSelected,
        clearStockSucursalSelected,
        update,
        setSucursalIdSelected,
      }}
    >
      {children}
    </StockSucursalContext.Provider>
  );
};

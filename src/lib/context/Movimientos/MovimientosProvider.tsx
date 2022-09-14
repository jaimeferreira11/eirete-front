import { FC, useReducer } from 'react';

import eireteApi from '@core/api';
import { IEnpointResult, IMovimiento } from '@core/interfaces';
import { INewMovimiento } from '@lib/interfaces';
import axios, { AxiosError } from 'axios';
import { MovimientosContext } from './MovimientosContext';
import { movimientosReducer } from './movimientosReducer';

export interface MovimientosState {
  movimientoSelected: IMovimiento | undefined;
}

const MOVIMIENTOS_INITIAL_STATE: MovimientosState = {
  movimientoSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const MovimientosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    movimientosReducer,
    MOVIMIENTOS_INITIAL_STATE
  );

  const getById = (_id: string, movimientos: IMovimiento[]): void => {
    const movimiento = movimientos.find((item) => item._id === _id);
    dispatch({ type: 'setMovimientoSelected', payload: movimiento! });
  };

  const save = async (newData: INewMovimiento): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/movimientos', newData);

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message || '',
        };
      }
      return {
        hasError: true,
        message: 'Something went wrong! 😵‍💫',
      };
    }
  };

  const update = async (
    newData: INewMovimiento,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/movimientos/${_id}`, newData);

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
    <MovimientosContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </MovimientosContext.Provider>
  );
};

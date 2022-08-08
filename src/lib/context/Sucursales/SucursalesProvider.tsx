import { FC, useReducer } from 'react';

import eireteApi from '@core/api';
import { IEnpointResult, ISucursal } from '@core/interfaces';
import axios, { AxiosError } from 'axios';
import { INewSucursal } from '../../interfaces/NewSucursal';
import { SucursalesContext, sucursalesReducer } from './';

export interface SucursalesState {
  sucursalSelected: ISucursal | undefined;
}

const SUCURSALES_INITIAL_STATE: SucursalesState = {
  sucursalSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const SucursalesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    sucursalesReducer,
    SUCURSALES_INITIAL_STATE
  );

  const getById = (_id: string, sucursales: ISucursal[]): void => {
    const sucursal = sucursales.find((sucursal) => sucursal._id === _id);
    dispatch({ type: 'setSucursalSelected', payload: sucursal! });
  };

  const save = async (newSucursal: INewSucursal): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/sucursales', newSucursal);

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
    newSucursal: INewSucursal,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/sucursales/${_id}`, newSucursal);

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
    <SucursalesContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </SucursalesContext.Provider>
  );
};

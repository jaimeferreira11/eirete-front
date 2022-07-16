import { FC, useReducer } from 'react';

import eireteApi from '@core/api';
import { ICaja, IEnpointResult } from '@core/interfaces';
import axios from 'axios';
import { CajasContext, cajasReducer } from '.';

export interface CajasState {
  cajaSelected: ICaja | undefined;
}

const CAJAS_INITIAL_STATE: CajasState = {
  cajaSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const CajasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cajasReducer, CAJAS_INITIAL_STATE);

  const getById = (_id: string, cajas: ICaja[]): void => {
    const caja = cajas.find((caja) => caja._id === _id);
    dispatch({ type: 'setCajaSelected', payload: caja! });
  };

  const save = async (newCaja: any): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/cajas', newCaja);

      return {
        hasError: false,
      };
    } catch (error) {
      console.log('error', error);
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

  const update = async (newCaja: any, _id: string): Promise<IEnpointResult> => {
    try {
      console.log('_id', _id);
      console.log('updatedCaja', newCaja);
      await eireteApi.put(`/cajas/${_id}`, newCaja);

      return {
        hasError: false,
      };
    } catch (error) {
      console.log('error', error);
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

  return (
    <CajasContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </CajasContext.Provider>
  );
};

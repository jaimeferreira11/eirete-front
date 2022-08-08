import eireteApi from '@core/api';
import { IEnpointResult, ILineaArticulo } from '@core/interfaces';
import { INewLineaArticulo } from '@lib/interfaces';
import axios from 'axios';
import { FC, useReducer } from 'react';
import { LineasContext } from './LineaArticulosContext';
import { lineasReducer } from './lineaArticulosReducer';

export interface LineasState {
  lineaSelected: ILineaArticulo | undefined;
}

const LINEAS_INITIAL_STATE: LineasState = {
  lineaSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const LineasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(lineasReducer, LINEAS_INITIAL_STATE);

  const getById = (_id: string, lienas: ILineaArticulo[]): void => {
    const linea = lienas.find((linea) => linea._id === _id);
    dispatch({ type: 'setLineaSelected', payload: linea! });
  };

  const save = async (newLinea: INewLineaArticulo): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/linea-articulos', newLinea);

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
    newLinea: INewLineaArticulo,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/linea-articulos/${_id}`, newLinea);

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

  return (
    <LineasContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </LineasContext.Provider>
  );
};

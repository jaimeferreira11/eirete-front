import { FC, useReducer } from 'react';

import eireteApi from '@core/api';
import { ICategoriaMovimiento, IEnpointResult } from '@core/interfaces';
import axios from 'axios';
import { CategoriaMovimientosContext, categoriaMovimientosReducer } from '.';

export interface CategoriaMovimientoState {
  categoriaSelected: ICategoriaMovimiento | undefined;
}

const INITIAL_STATE: CategoriaMovimientoState = {
  categoriaSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const CategoriaMovimientosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    categoriaMovimientosReducer,
    INITIAL_STATE
  );

  const getById = (_id: string, categorias: ICategoriaMovimiento[]): void => {
    const data = categorias.find((cat) => cat._id === _id);
    dispatch({ type: 'setCategoriaSelected', payload: data! });
  };

  const save = async (newCategoria: any): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/categorias-movimientos', newCategoria);

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
    newCategoria: any,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      console.log(newCategoria);
      await eireteApi.put(`/categorias-movimientos/${_id}`, newCategoria);

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
    <CategoriaMovimientosContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </CategoriaMovimientosContext.Provider>
  );
};

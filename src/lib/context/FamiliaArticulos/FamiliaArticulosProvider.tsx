import eireteApi from '@core/api';
import { IEnpointResult, IFamiliaArticulo } from '@core/interfaces';
import { INewFamiliaArticulo } from '@lib/interfaces';
import axios from 'axios';
import { FC, useReducer } from 'react';
import { FamiliasContext, familiasReducer } from '.';


export interface FamiliasState {
  familiaSelected: IFamiliaArticulo | undefined;
}

const FAMILIAS_INITIAL_STATE: FamiliasState = {
  familiaSelected: undefined,
};

interface Props {
  children?: React.ReactNode;
}

export const FamiliasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    familiasReducer,
    FAMILIAS_INITIAL_STATE
  );

  const getById = (_id: string, familias: IFamiliaArticulo[]): void => {
    const familia = familias.find((familia) => familia._id === _id);
    dispatch({ type: 'setFamiliaSelected', payload: familia! });
  };

  const save = async (newFamilia: INewFamiliaArticulo): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/familia-articulos', newFamilia);

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

  const update = async (
    newFamilia: INewFamiliaArticulo,
    _id: string
  ): Promise<IEnpointResult> => {
    try {
      console.log('_id', _id);
      console.log('newFamilia', newFamilia);
      await eireteApi.put(`/familia-articulos/${_id}`, newFamilia);

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
    <FamiliasContext.Provider
      value={{
        ...state,
        save,
        update,
        getById,
      }}
    >
      {children}
    </FamiliasContext.Provider>
  );
};

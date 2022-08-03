import eireteApi from '@core/api';
import { ICliente } from '@core/interfaces';
import axios from 'axios';
import { FC, useReducer } from 'react';
import { ClienteContext, clienteReducer } from './';

export interface ClienteState {}

const CLIENTE_INITIAL_STATE: ClienteState = {};

interface Props {
  children?: React.ReactNode;
}

export const ClienteProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(clienteReducer, CLIENTE_INITIAL_STATE);

  const saveCliente = async (
    newCliente: any,
    cliente: ICliente | undefined
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      console.log('cliente', cliente);
      if (!cliente) await eireteApi.post('/clientes', { persona: newCliente });
      else
        await eireteApi.put(`/clientes/${cliente._id}`, {
          persona: { _id: cliente.persona._id, ...newCliente },
        });

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

  const changeStatus = async (
    _id: string,
    status: boolean
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await eireteApi.put(`/clientes/change-status/${_id}/${status}`);

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
    <ClienteContext.Provider
      value={{
        ...state,
        saveCliente,
        changeStatus,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

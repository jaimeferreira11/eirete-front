import eireteApi from '@core/api';
import { useCallback } from 'react';
import { Direccion, ICliente } from '../interfaces/cliente';

export const useClienteService = () => {
  const addDireccionEntrega = useCallback(
    async (direcciones: Direccion[], clienteId: string) => {
      const { data } = await eireteApi.put(
        `/clientes/${clienteId}/direcciones`,
        {
          direcciones: direcciones,
        }
      );

      return data;
    },
    []
  );

  const searchClienteByNroDocumento = useCallback(
    async (nroDocumento: string) => {
      const { data: cliente } = await eireteApi.get<ICliente>(
        `/clientes/search/persona/nrodoc/${nroDocumento}`
      );

      return cliente;
    },
    []
  );

  return { addDireccionEntrega, searchClienteByNroDocumento };
};

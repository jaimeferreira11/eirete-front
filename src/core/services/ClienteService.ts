import eireteApi from '@core/api';
import { ListPaginatedResponse } from '@core/interfaces';
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

  const searchClienteGeneral = useCallback(async (clave: string) => {
    const { data: clientes } = await eireteApi.get<
      ListPaginatedResponse<ICliente>
    >(`/clientes?estado=true&search=${clave}`);

    return clientes.data;
  }, []);

  return {
    addDireccionEntrega,
    searchClienteByNroDocumento,
    searchClienteGeneral,
  };
};

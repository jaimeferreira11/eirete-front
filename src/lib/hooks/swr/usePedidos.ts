import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';
import { DeliveryEstado } from '@core/interfaces/delivery';
import useSWR, { SWRConfiguration } from 'swr';

export const usePedidosPaginado = (
  url: string,
  search: string,
  active: string,
  config: SWRConfiguration = {}
) => {
  let urlProccess = url;
  if (search) urlProccess = `${urlProccess}&search=${search}`;

  // urlProccess = `${urlProccess}&estado=${active}`;

  const { data, error, mutate } = useSWR<
    ListPaginatedResponse<IPedidoResponse>
  >(`${urlProccess}`, config);

  return {
    pedidos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const usePedidosEstadoDeliveryPaginado = (
  estado: DeliveryEstado,
  limite: number,
  desde: number,
  search: string,
  config: SWRConfiguration = {}
) => {
  let urlProccess = `/pedidos/search/estado-delivery/${estado}?paginado=true&limite=${limite}&desde=${desde}`;
  if (search) urlProccess = `${urlProccess}&search=${search}`;

  const { data, error, mutate } = useSWR<
    ListPaginatedResponse<IPedidoResponse>
  >(urlProccess, config);

  return {
    pedidos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

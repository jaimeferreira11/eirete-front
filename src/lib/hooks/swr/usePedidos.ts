import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';
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

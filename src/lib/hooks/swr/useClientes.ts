import { ICliente, ListPaginatedResponse } from '@core/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useClientes = (
  url: string,
  search: string,
  active: string,
  config: SWRConfiguration = {}
) => {
  let urlProccess = url;
  if (search) urlProccess = `${urlProccess}&search=${search}`;

  urlProccess = `${urlProccess}&estado=${active}`;

  const { data, error, mutate } = useSWR<ListPaginatedResponse<ICliente>>(
    `${urlProccess}`,
    config
  );

  return {
    clientes: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

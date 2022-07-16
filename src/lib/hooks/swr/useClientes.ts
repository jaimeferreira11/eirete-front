import { ICliente, ListPaginatedResponse } from '@core/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useClientes = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, mutate } = useSWR<ListPaginatedResponse<ICliente>>(
    `${url}`,
    config
  );

  return {
    clientes: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

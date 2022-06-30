import { ListUserResponse } from '@core/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useUsers = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, mutate } = useSWR<ListUserResponse>(`${url}`, config);

  return {
    users: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

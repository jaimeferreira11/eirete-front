import { IUser, ListPaginatedResponse } from '@core/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useUsers = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, mutate } = useSWR<ListPaginatedResponse<IUser>>(
    `${url}`,
    config
  );

  return {
    users: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

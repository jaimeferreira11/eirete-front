import { IUser, ListPaginatedResponse } from '@core/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useUsers = (
  url: string,
  { search, active }: { search: string; active: string },
  config: SWRConfiguration = {}
) => {
  let urlProccess = url;
  if (search) urlProccess = `${urlProccess}&search=${search}`;

  urlProccess = `${urlProccess}&estado=${active}`;

  const { data, error, mutate } = useSWR<ListPaginatedResponse<IUser>>(
    `${urlProccess}`,
    config
  );

  return {
    users: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

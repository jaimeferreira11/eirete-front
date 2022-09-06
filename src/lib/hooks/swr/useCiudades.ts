import { ICiudad } from '@core/interfaces';
import useSWR from 'swr/immutable';

export const useCiudades = () => {
  const { data, error, mutate } = useSWR<ICiudad[]>('/ciudades', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    ciudades: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

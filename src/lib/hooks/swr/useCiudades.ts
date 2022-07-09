import { ICiudad } from '@core/interfaces';
import useSWR from 'swr';

export const useCiudades = () => {
  const { data, error, mutate } = useSWR<ICiudad[]>('/ciudades');

  return {
    ciudades: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

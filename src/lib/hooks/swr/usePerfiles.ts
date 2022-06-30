import { IPerfil } from '@core/interfaces';
import useSWR from 'swr';

export const usePerfil = () => {
  const { data, error, mutate } = useSWR<IPerfil[]>('/perfiles');

  return {
    perfiles: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

import { ISucursal } from '@core/interfaces';
import useSWR from 'swr';

export const useSucursal = () => {
  const { data, error, mutate } = useSWR<ISucursal[]>('/sucursales');

  return {
    sucursales: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

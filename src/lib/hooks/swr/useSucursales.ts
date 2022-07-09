import { ISucursal, ListPaginationOptions } from '@core/interfaces';
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

interface Props {
  active: string;
  pagination: ListPaginationOptions;
}

export const useSucursalPaginado = ({ active, pagination }: Props) => {
  const { data, error, mutate } = useSWR(
    `/sucursales?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}`
  );

  return {
    sucursales: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useSucursalGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<ISucursal>(`/sucursales/${_id}`, {
    revalidateIfStale: true,
  });

  return {
    sucursal: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

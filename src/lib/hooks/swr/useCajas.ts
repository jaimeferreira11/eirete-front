import { ICaja, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

export const useCaja = () => {
  const { data, error, mutate } = useSWR<ICaja[]>('/cajas');

  return {
    cajas: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

interface Props {
  active: string;
  pagination: ListPaginationOptions;
  search?: string;
}

export const useCajaPaginado = ({ active, pagination, search }: Props) => {
  const { data, error, mutate } = useSWR(
    `/cajas?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    cajas: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useCajaGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<ICaja>(`/cajas/${_id}`, {
    revalidateIfStale: true,
  });

  return {
    caja: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

import { IFamiliaArticulo, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

export const useFamilia = () => {
  const { data, error, mutate } = useSWR<IFamiliaArticulo[]>('/familia-articulos');

  return {
    familias: data || null,
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

export const useFamiliaPaginado = ({ active, pagination, search }: Props) => {
  const { data, error, mutate } = useSWR(
    `/familia-articulos?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    familias: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useFamiliaGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<IFamiliaArticulo>(`/familia-articulos/${_id}`, {
    revalidateIfStale: true,
  });

  return {
    familia: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

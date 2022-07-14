import { IPerfil, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

export const usePerfil = () => {
  const { data, error, mutate } = useSWR<IPerfil[]>('/perfiles');

  console.log(data);

  return {
    perfiles: data || null,
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

export const usePerfilPaginado = ({ active, pagination, search }: Props) => {
  const { data, error, mutate } = useSWR(
    `/perfiles?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    perfiles: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const usePerfilGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<IPerfil>(`/perfiles/${_id}`, {
    revalidateIfStale: true,
  });

  return {
    perfil: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

import { IMovimiento, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

export const useMovimiento = () => {
  const { data, error, mutate } = useSWR<IMovimiento[]>('/movimientos');

  return {
    movimientos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

interface Props {
  ingreso: string;
  egreso: string;
  pagination: ListPaginationOptions;
  search?: string;
}

export const useMovimientoPaginado = ({
  ingreso,
  egreso,
  pagination,
  search,
}: Props) => {
  const { data, error, mutate } = useSWR(
    `/movimientos?paginado=true&esEgreso=${egreso}&esIngreso=${ingreso}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    movimientos: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useMovimientoGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<IMovimiento>(`/movimientos/${_id}`, {
    revalidateIfStale: true,
  });

  return {
    movimiento: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

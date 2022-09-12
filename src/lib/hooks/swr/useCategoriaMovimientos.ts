import { ICategoriaMovimiento, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

interface Props1 {
  tipo?: 'ingresos' | 'egresos';
}
export const useCategoriaMovimientos = ({ tipo }: Props1) => {
  let { data, error, mutate } = useSWR<ICategoriaMovimiento[]>(
    '/categorias-movimientos'
  );

  if (tipo && data) {
    if (tipo === 'ingresos') data = data.filter((c) => c.esIngreso);
    if (tipo === 'egresos') data = data.filter((c) => c.esGasto);
  }

  return {
    categorias: data || null,
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

export const useCategoriaMovimientosPaginado = ({
  active,
  pagination,
  search,
}: Props) => {
  const { data, error, mutate } = useSWR(
    `/categorias-movimientos?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    categorias: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useCategoriaGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<ICategoriaMovimiento>(
    `/categorias-movimientos/${_id}`,
    {
      revalidateIfStale: true,
    }
  );

  return {
    categorias: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

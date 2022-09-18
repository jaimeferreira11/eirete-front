import { ILineaArticulo, ListPaginationOptions } from '@core/interfaces';
import useSWR from 'swr';

export const useLinea = () => {
  const { data, error, mutate } = useSWR<ILineaArticulo[]>('/linea-articulos');

  return {
    lineas: data || null,
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

export const useLineaPaginado = ({ active, pagination, search }: Props) => {
  const { data, error, mutate } = useSWR(
    `/linea-articulos?paginado=true&estado=${active}&limite=${pagination.limite}&desde=${pagination.desde}&search=${search}`
  );

  return {
    lineas: data ? data.data || [] : [],
    total: data ? data.total || 0 : 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useLineaGetById = ({ _id }: { _id: string }) => {
  const { data, error, mutate } = useSWR<ILineaArticulo>(
    `/linea-articulos/${_id}`,
    {
      revalidateIfStale: true,
    }
  );

  return {
    linea: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

// TODO: Debe estar en la ruta de linea de articulos
export const useLineasBySucursal = ({
  sucursalId,
  active,
}: {
  sucursalId: string;
  active: boolean;
}) => {
  const { data, error, mutate } = useSWR<ILineaArticulo[]>(
    `/stock/sucursal/${sucursalId}/lineas?estado=${active}`
  );

  return {
    lineas: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

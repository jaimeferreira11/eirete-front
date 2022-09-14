import {
  IArqueo,
  ListPaginatedResponse,
  ListPaginationOptions,
} from '@core/interfaces';
import useSWR from 'swr';

interface Props {
  active: string;
  pagination: ListPaginationOptions;
  search?: string;
  fechaDesde: string;
  fechaHasta: string;
}

export const useArqueoPaginado = (
  limite: number,
  desde: number,
  search: string,
  fechaDesde: string,
  fechaHasta: string
) => {
  const { data, error, mutate } = useSWR<ListPaginatedResponse<IArqueo>>(
    `/arqueos?paginado=true&estado=true&limite=${limite}&desde=${desde}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&search=${search}`
  );

  return {
    arqueos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

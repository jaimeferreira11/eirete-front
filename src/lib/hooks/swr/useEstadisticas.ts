import {
  IEstadisticas,
  IPedidoResponse,
  ListPaginatedResponse,
  ListPaginationOptions,
} from '@core/interfaces';
import useSWR from 'swr';

export const useEstadisticasSucursal = (
  _fechaDesde?: string,
  _fechaHasta?: string,
  _sucursalId?: string
) => {
  let url = `/reportes/estadistica-ventas?fechaDesde=${_fechaDesde}&fechaHasta=${_fechaHasta}`;

  if (_sucursalId && _sucursalId !== 'all') url += `&sucursalId=${_sucursalId}`;

  const { data, error, mutate } = useSWR<IEstadisticas>(url, {
    revalidateIfStale: false,
  });

  return {
    estadisticas: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useEstadisticasPedidoPaginado = (
  _pagination: ListPaginationOptions,
  _sucursalId: string,
  _fechaDesde: string,
  _fechaHasta: string
) => {
  let url = `/reportes/estadistica-pedidos?fechaDesde=${_fechaDesde}&fechaHasta=${_fechaHasta}`;
  if (_sucursalId && _sucursalId !== 'all') url += `&sucursalId=${_sucursalId}`;

  const { data, error, mutate } = useSWR<
    ListPaginatedResponse<IPedidoResponse>
  >(url, { revalidateIfStale: false });

  // /reportes/estadistica-pedidos?fechaDesde=2022-07-01&fechaHasta=2022-09-27
  return {
    pedidos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

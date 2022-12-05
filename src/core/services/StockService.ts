import eireteApi from '@core/api';
import {
  IArticuloMovimiento,
  ListPaginatedResponse,
  ListPaginationOptions,
} from '@core/interfaces';
import useSWR from 'swr';

export type EstadoMovimientoArticulo =
  | 'PENDIENTE'
  | 'ATENCION'
  | 'RECHAZADO'
  | 'FINALIZADO';

export const useStockService = () => {
  const getArticulosRecibidos = async (
    pagination: ListPaginationOptions,
    sucursalId: string,
    estado: EstadoMovimientoArticulo
  ) => {
    const { data: articulos } = await eireteApi.get<
      ListPaginatedResponse<IArticuloMovimiento>
    >(
      `/articulo-movimientos?paginado=true&sucursalOrigen=${sucursalId}&limite=${pagination.limite}&desde=${pagination.desde}&estado=${estado}`
    );

    return articulos.data;
  };

  return { getArticulosRecibidos };
};

interface Props {
  pagination: ListPaginationOptions;
  sucursalId: string;
  estado: EstadoMovimientoArticulo;
}

export const useArticulosMovimiento = ({
  pagination,
  sucursalId,
  estado,
}: Props) => {
  let url = `/articulo-movimientos?paginado=true&sucursalDestino=${sucursalId}&limite=${pagination.limite}&desde=${pagination.desde}&estado=${estado}`;
  if (estado !== 'PENDIENTE') {
    url = `/articulo-movimientos?paginado=true&sucursalOrigen=${sucursalId}&limite=${pagination.limite}&desde=${pagination.desde}&estado=${estado}`;
  }

  const { data, error, mutate } = useSWR(url);

  return {
    articulos: data ? data : null,

    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

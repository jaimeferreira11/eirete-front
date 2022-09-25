import useSWR from 'swr';

import { ILineaArticulo, IStockArticuloSucursal } from '@core/interfaces';
import { ILineasStockArticulosSearch } from '@lib/interfaces/LineasStockArticulosSearch';
import { IArticuloSucursal } from '../../../core/interfaces/articuloSucursal';

export const useStockPorSucursal = (sucursalId?: string) => {
  const { data, error, mutate } = useSWR<IArticuloSucursal[]>(
    `/stock/sucursal/${sucursalId}`
  );

  return {
    articulosSucursal: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useStockLineasSucursal = (sucursalId?: string) => {
  const { data, error, mutate } = useSWR<ILineaArticulo[]>(
    `/stock/sucursal/${sucursalId}/lineas?estado=true`,
    { revalidateIfStale: false }
  );

  return {
    lineas: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useStockArticulosLineasSucursal = (
  sucursalId: string,
  lineaId: string
) => {
  const { data, error, mutate } = useSWR<IStockArticuloSucursal[]>(
    `/stock/sucursal/${sucursalId}/linea/${lineaId}/articulos?estado=true`,
    { revalidateIfStale: false }
  );

  return {
    articulos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useArticulosStockPorLineaSearch = (
  sucursalId: string,
  search?: string
) => {
  const { data, error, mutate } = useSWR<ILineasStockArticulosSearch[]>(
    `/stock/sucursal/${sucursalId}/search/articulos-con-lineas?search=${search}`
  );

  return {
    lineasArticulos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

// api/stock/sucursal/{sucursalId}

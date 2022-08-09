import useSWR from 'swr';

import { ILineasArticulosSearch } from '@lib/interfaces';
import { IArticuloSucursal } from '../../../core/interfaces/articuloSucursal';

export const useStockPorSucursal = (sucursalId: string) => {
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

export const useArticulosPorLineaSearch = (search?: string) => {
  const { data, error, mutate } = useSWR<ILineasArticulosSearch[]>(
    `/stock/search/articulos-con-lineas?search=${search}`
  );

  return {
    lineasArticulos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

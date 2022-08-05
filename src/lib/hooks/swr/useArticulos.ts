import useSWR from 'swr';

import { IArticulo } from '@core/interfaces';
import { ILineasArticulosSearch } from '@lib/interfaces';

export const useArticulosPorLinea = (lineaId: string) => {
  const { data, error, mutate } = useSWR<IArticulo[]>(
    `/articulos?estado=true&linea=${lineaId}`
  );

  return {
    articulos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useArticulosPorLineaSearch = (search?: string) => {
  const { data, error, mutate } = useSWR<ILineasArticulosSearch[]>(
    `/articulos/search/articulos-con-lineas?search=${search}`
  );

  return {
    lineasArticulos: data || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

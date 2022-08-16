import { ILineaArticulo, IStockArticuloSucursal } from '@core/interfaces';
import useSWR from 'swr';

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

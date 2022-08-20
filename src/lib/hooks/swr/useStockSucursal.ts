import useSWR from 'swr';

import { IStockArticuloSucursal } from '@core/interfaces';
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

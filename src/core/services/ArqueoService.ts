import eireteApi from '@core/api';
import { IArqueo, ICierreCaja, ListPaginatedResponse } from '@core/interfaces';
import { useCallback } from 'react';

export const useArqueoService = () => {
  const getArqueosRangoFecha = useCallback(
    async (fechaDesde: string, fechaHasta: string) => {
      const { data } = await eireteApi.get<ListPaginatedResponse<IArqueo>>(
        `/arqueos`,
        {
          params: {
            estado: true,
            paginado: true,
            fechaDesde,
            fechaHasta,
          },
        }
      );

      return data;
    },
    []
  );

  const saveArqueo = useCallback(async (arqueo: ICierreCaja) => {
    await eireteApi.post(`/arqueos`, arqueo);
  }, []);

  return { getArqueosRangoFecha, saveArqueo };
};

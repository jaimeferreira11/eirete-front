import { createContext } from 'react';

import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';

interface ContextProps {
  pedidosList: ListPaginatedResponse<IPedidoResponse>;
  sucursalId: string;
  fechaDesdeFilter: string;
  fechaHastaFilter: string;
  updateRangeData: (_fechaDesde: string, _fechaHasta: string) => void;
  setRangeDateToday: () => void;
  setRangeDateWeek: () => void;
  setRangeDateMonth: () => void;
  setRangeDateYear: () => void;
  setSucursalId: (_sucursalId: string) => void;
}

export const EstadisticasContext = createContext({} as ContextProps);

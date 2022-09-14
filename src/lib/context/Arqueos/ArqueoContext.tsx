import { createContext } from 'react';

import { IArqueo, ListPaginatedResponse } from '@core/interfaces';

interface ContextProps {
  arqueosList: ListPaginatedResponse<IArqueo>;
  fechaDesdeFilter: string;
  fechaHastaFilter: string;
  updateRangeData: (_fechaDesde: string, _fechaHasta: string) => void;
  setRangeDateToday: () => void;
  setRangeDateWeek: () => void;
  setRangeDateMonth: () => void;
  setRangeDateYear: () => void;
}

export const ArqueoContext = createContext({} as ContextProps);

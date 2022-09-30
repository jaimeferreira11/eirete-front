import { FC, useReducer } from 'react';

import dayjs from 'dayjs';

import { IPedidoResponse, ListPaginatedResponse } from '@core/interfaces';
import { estadisticasReducer } from '.';
import { EstadisticasContext } from './EstadisticasContext';

export interface EstadisticasState {
  fechaDesdeFilter: string;
  fechaHastaFilter: string;
  pedidosList: ListPaginatedResponse<IPedidoResponse>;
  sucursalId: string;
}

const ESTADISTISCAS_INITIAL_STATE: EstadisticasState = {
  fechaDesdeFilter: dayjs().format('YYYY-MM-DD'),
  fechaHastaFilter: dayjs().format('YYYY-MM-DD'),
  pedidosList: {
    total: 0,
    data: [],
  },
  sucursalId: 'all',
};

interface Props {
  children?: React.ReactNode;
}

//   const [value, setValue] = useState<Dayjs | null>(dayjs());
export const EstadisticasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    estadisticasReducer,
    ESTADISTISCAS_INITIAL_STATE
  );

  const updateRangeData = (fechaDesde: string, fechaHasta: string) => {
    dispatch({ type: 'UpdateDates', payload: { fechaDesde, fechaHasta } });
  };

  const setRangeDateToday = () => {
    dispatch({
      type: 'UpdateDates',
      payload: {
        fechaDesde: dayjs().format('YYYY-MM-DD'),
        fechaHasta: dayjs().format('YYYY-MM-DD'),
      },
    });
  };

  const setRangeDateWeek = () => {
    dispatch({
      type: 'UpdateDates',
      payload: {
        fechaDesde: dayjs().day(1).format('YYYY-MM-DD'),
        fechaHasta: dayjs().day(5).format('YYYY-MM-DD'),
      },
    });
  };

  const setRangeDateMonth = () => {
    dispatch({
      type: 'UpdateDates',
      payload: {
        fechaHasta: dayjs().endOf('month').format('YYYY-MM-DD'),
        fechaDesde: dayjs().startOf('month').format('YYYY-MM-DD'),
      },
    });
  };

  const setRangeDateYear = () => {
    dispatch({
      type: 'UpdateDates',
      payload: {
        fechaHasta: dayjs().endOf('year').format('YYYY-MM-DD'),
        fechaDesde: dayjs().startOf('year').format('YYYY-MM-DD'),
      },
    });
  };

  const setSucursalId = (_sucursalId: string) => {
    dispatch({
      type: 'UpdateSucursal',
      payload: _sucursalId,
    });
  };

  return (
    <EstadisticasContext.Provider
      value={{
        ...state,
        updateRangeData,
        setRangeDateToday,
        setRangeDateWeek,
        setRangeDateMonth,
        setRangeDateYear,
        setSucursalId,
      }}
    >
      {children}
    </EstadisticasContext.Provider>
  );
};

import { FC, useReducer } from 'react';

import dayjs from 'dayjs';

import { IArqueo, ListPaginatedResponse } from '@core/interfaces';
import { ArqueoContext, arqueoReducer } from './';

export interface ArqueoState {
  fechaDesdeFilter: string;
  fechaHastaFilter: string;
  arqueosList: ListPaginatedResponse<IArqueo>;
}

const ARQUEO_INITIAL_STATE: ArqueoState = {
  fechaDesdeFilter: dayjs().format('YYYY-MM-DD'),
  fechaHastaFilter: dayjs().format('YYYY-MM-DD'),
  arqueosList: {
    total: 0,
    data: [],
  },
};

interface Props {
  children?: React.ReactNode;
}

//   const [value, setValue] = useState<Dayjs | null>(dayjs());
export const ArqueoProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(arqueoReducer, ARQUEO_INITIAL_STATE);

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

  return (
    <ArqueoContext.Provider
      value={{
        ...state,
        updateRangeData,
        setRangeDateToday,
        setRangeDateWeek,
        setRangeDateMonth,
        setRangeDateYear,
      }}
    >
      {children}
    </ArqueoContext.Provider>
  );
};

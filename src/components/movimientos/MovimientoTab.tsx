import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslation } from 'next-i18next';

import { Box, Typography } from '@mui/material';

import {
  FullScreenLoading,
  IListGenericaPagination,
  ListGeneric,
} from '@components/ui';
import { IMovimiento, ListPaginationOptions } from '@core/interfaces';
import { useMovimientoPaginado } from '@lib/hooks';
import { parseMovimientosToItemList } from 'src/utils';
import { KeyedMutator } from 'swr';
import { MovimientoDetailPlaceHolder } from './MovimientoDetailPlaceHolder';
import { MovimientoEditView } from './MovimientoEditView';

interface Props {
  tipo: 'ingresos' | 'egresos';
  mutateRef: MutableRefObject<any>;
  children?: React.ReactNode;
}

export const MovimientoTab: FC<Props> = ({ tipo, mutateRef }) => {
  const { t } = useTranslation('movimientosABM');

  const [search, setSearch] = useState('');

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
    currentPage: 0,
  });

  const onPageChange = useCallback((page: number): void => {
    setPagination((prev) => ({
      ...prev,
      desde: page * prev.limite,
      currentPage: page,
    }));
  }, []);

  const onRowsPerPageChange = useCallback((pageSize: number): void => {
    setPagination((prev) => ({
      ...prev,
      desde: 0,
      limite: pageSize,
      currentPage: 0,
    }));
  }, []);

  const [movimientoSelected, setEditMovimiento] = useState<
    IMovimiento | undefined
  >(undefined);

  const {
    movimientos,
    isLoading,
    total,
    mutate,
  }: {
    movimientos: IMovimiento[];
    isLoading: boolean;
    total: number;
    mutate: KeyedMutator<any>;
  } = useMovimientoPaginado({
    ingreso: tipo === 'ingresos' ? 'true' : 'false',
    egreso: tipo === 'egresos' ? 'true' : 'false',
    pagination,
    search,
  });

  useEffect(() => {
    mutateRef.current = mutate;
  }, [mutate, mutateRef]);

  const optionsPagination = useMemo<IListGenericaPagination>(() => {
    return {
      currentPage: pagination.currentPage || 0,
      rowsPerPage: pagination.limite,
      totalItems: total,
      totalPages: Math.ceil(total === 0 ? 1 : total / pagination.limite),
      onPageChange,
      onRowsPerPageChange,
    };
  }, [
    onPageChange,
    onRowsPerPageChange,
    pagination.currentPage,
    pagination.limite,
    total,
  ]);

  const movimientosAsItemList = useMemo(
    () => parseMovimientosToItemList(movimientos),
    [movimientos]
  );

  const onSelect = useCallback(
    (_id: string) => {
      const movimientoS = movimientos.find((item) => item._id === _id);
      setEditMovimiento(movimientoS);
    },
    [movimientos]
  );

  const onCancel = useCallback(() => {
    setEditMovimiento(undefined);
    if (mutateRef.current) mutateRef.current();
  }, [mutateRef]);

  const onSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(target.value);
    },
    []
  );

  return (
    <Box display="flex" flex={'100%'} sx={{ height: '100%' }}>
      <Box
        flex={'40%'}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        sx={{
          borderRight: '0.1em solid #EAEAEA',
        }}
      >
        <Box sx={{ mx: 2, mt: 2 }}>
          <Typography variant="h5" component={'div'} sx={{ mb: 2 }}>
            {t('title')}
          </Typography>
        </Box>

        <Box display="flex" flexGrow={1} sx={{ mx: 0 }}>
          {isLoading ? (
            <FullScreenLoading />
          ) : (
            <ListGeneric
              items={movimientosAsItemList}
              title={t('title')}
              selected={movimientoSelected?._id}
              pagination={optionsPagination}
              emptyText={t('emptyList')}
              onSelect={onSelect}
            />
          )}
        </Box>
      </Box>
      <Box
        flex={'60%'}
        sx={{ pl: 2, pt: 2 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h5" component={'div'}>
          {t('details')}
        </Typography>

        <Box height="100%" flex={1} display="flex">
          {!movimientoSelected ? (
            <MovimientoDetailPlaceHolder message={t('seleccionHelp')} />
          ) : (
            <MovimientoEditView
              movimiento={movimientoSelected}
              onCancel={onCancel}
              tipo={tipo}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

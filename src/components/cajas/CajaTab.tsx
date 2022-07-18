import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useTranslation } from 'next-i18next';

import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import debounce from 'debounce';

import {
  FullScreenLoading,
  IListGenericaPagination,
  ListGeneric,
} from '@components/ui';
import { ListPaginationOptions } from '@core/interfaces';
import { useCajaPaginado } from '@lib/hooks';
import { useEffect } from 'react';
import { parseCajasToItemList } from 'src/utils';
import { KeyedMutator } from 'swr';
import { ICaja } from '../../core/interfaces/caja';
import { CajaDetailPlaceHolder } from './CajaDetailPlaceHolder';
import { CajaEditView } from './CajaEditView';

interface Props {
  tipo: 'activos' | 'inactivos';
  mutateRef: MutableRefObject<any>;
  children?: React.ReactNode;
}

export const CajaTab: FC<Props> = ({ tipo, mutateRef }) => {
  const { t } = useTranslation('cajasABM');

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

  const [cajaSelected, setEditCaja] = useState<ICaja | undefined>(undefined);

  const {
    cajas,
    isLoading,
    total,
    mutate,
  }: {
    cajas: ICaja[];
    isLoading: boolean;
    total: number;
    mutate: KeyedMutator<any>;
  } = useCajaPaginado({
    active: tipo === 'activos' ? 'true' : 'false',
    pagination,
    search,
  });

  useEffect(() => {
    mutateRef.current = mutate;
  }, [mutate]);

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

  const cajasAsItemList = useMemo(() => parseCajasToItemList(cajas), [cajas]);

  const onSelect = useCallback(
    (_id: string) => {
      const cajaS = cajas.find((caja) => caja._id === _id);
      setEditCaja(cajaS);
    },
    [cajas]
  );

  const onCancel = useCallback(() => {
    setEditCaja(undefined);
  }, []);

  const onSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(target.value);
    },
    []
  );

  return (
    <Box display="flex" sx={{ height: '100%' }}>
      <Box
        flex={1}
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
          <TextField
            fullWidth
            size="small"
            label={t('search')}
            onChange={debounce(onSearch, 500)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box flexGrow={1} sx={{ mx: 2 }}>
          {isLoading ? (
            <FullScreenLoading />
          ) : (
            <ListGeneric
              items={cajasAsItemList}
              title={t('title')}
              selected={cajaSelected?._id}
              pagination={optionsPagination}
              emptyText={t('emptyList')}
              onSelect={onSelect}
            />
          )}
        </Box>
      </Box>
      <Box
        flex={1}
        sx={{ pl: 2, pt: 2 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h5" component={'div'}>
          {t('details')}
        </Typography>

        <Box height="100%" flex={1} display="flex">
          {!cajaSelected ? (
            <CajaDetailPlaceHolder message={t('cajaSeleccionHelp')} />
          ) : (
            <CajaEditView caja={cajaSelected} onCancel={onCancel} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

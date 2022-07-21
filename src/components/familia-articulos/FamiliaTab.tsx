import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  FullScreenLoading,
  IListGenericaPagination,
  ListGeneric,
} from '@components/ui';
import { IFamiliaArticulo, ListPaginationOptions } from '@core/interfaces';
import { useFamiliaPaginado } from '@lib/hooks';
import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import debounce from 'debounce';
import { useTranslation } from 'next-i18next';

import { useEffect } from 'react';
import { parseFamiliasToItemList } from 'src/utils';
import { KeyedMutator } from 'swr';
import { FamiliaDetailPlaceHolder } from './FamiliaDetailPlaceHolder';
import { FamiliaEditView } from './FamiliaEditView';

interface Props {
  tipo: 'activos' | 'inactivos';
  mutateRef: MutableRefObject<any>;
  children?: React.ReactNode;
}

export const FamiliaTab: FC<Props> = ({ tipo, mutateRef }) => {
  const { t } = useTranslation('familiaArticulosABM');

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

  const [familiaSelected, setEditFamilia] = useState<
    IFamiliaArticulo | undefined
  >(undefined);

  const {
    familias,
    isLoading,
    total,
    mutate,
  }: {
    familias: IFamiliaArticulo[];
    isLoading: boolean;
    total: number;
    mutate: KeyedMutator<any>;
  } = useFamiliaPaginado({
    active: tipo === 'activos' ? 'true' : 'false',
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

  const familiasAsItemList = useMemo(
    () => parseFamiliasToItemList(familias),
    [familias]
  );

  const onSelect = useCallback(
    (_id: string) => {
      const familiasS = familias.find((familia) => familia._id === _id);
      setEditFamilia(familiasS);
    },
    [familias]
  );

  const onCancel = useCallback(() => {
    setEditFamilia(undefined);
    if (mutateRef.current) mutateRef.current();
  }, [mutateRef]);

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

        <Box flexGrow={1} sx={{ mx: 0 }}>
          {isLoading ? (
            <FullScreenLoading />
          ) : (
            <ListGeneric
              items={familiasAsItemList}
              title={t('title')}
              selected={familiaSelected?._id}
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
          {!familiaSelected ? (
            <FamiliaDetailPlaceHolder message={t('familiaSeleccionHelp')} />
          ) : (
            <FamiliaEditView familia={familiaSelected} onCancel={onCancel} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

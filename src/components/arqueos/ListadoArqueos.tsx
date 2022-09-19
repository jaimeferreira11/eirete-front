import { useMemo, useState } from 'react';

import { ReceiptLongOutlined as EditIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { DataGridEirete } from '@components/ui/DataGridComponents';
import { IArqueo, ListPaginationOptions } from '@core/interfaces';
import { useArqueoPaginado, useArqueoProvider } from '@lib/hooks';

import { useTranslation } from 'next-i18next';
import { formatCurrency, formateDate } from 'src/utils';
import { ActionsColumn } from '../ui/DataGridComponents/ActionsColumn';
import { ArqueoDetalleModal } from './ArqueoDetalleModal';
import { ArqueoFilterModal } from './ArqueoFilterModal';

type colorChip =
  | 'error'
  | 'default'
  | 'warning'
  | 'info'
  | 'success'
  | 'primary'
  | 'secondary'
  | undefined;

export const ListadoArqueos = () => {
  const { t } = useTranslation('arqueos', { keyPrefix: 'listado' });
  const { fechaDesdeFilter, fechaHastaFilter } = useArqueoProvider();

  const [arqueosData, setArqueosData] = useState<IArqueo[]>([]);
  const [search, setSearch] = useState({ search: '', active: 'true' });

  const [showModal, setShowModal] = useState<{
    show: boolean;
    item: IArqueo | undefined;
  }>({ show: false, item: undefined });

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const { isLoading, arqueos, mutate } = useArqueoPaginado(
    pagination.limite,
    pagination.desde,
    search.search,
    fechaDesdeFilter,
    fechaHastaFilter
  );

  useMemo(() => {
    setArqueosData(arqueos?.data || []);
  }, [arqueos?.data]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page * prev.limite }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const handleSearch = (
    query: string,
    active: string,
    newEstado: string = 'EN_CAMINO'
  ) => {
    setSearch({ search: query, active });
  };

  // columnas
  const columns: GridColDef[] = [
    {
      field: 'sucursal',
      headerName: t('sucursal'),
      width: 300,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.sucursal?.descripcion,
    },
    {
      field: 'fecha',
      headerName: t('fecha'),
      width: 150,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.fechaAlta ? formateDate(row.fechaAlta) : '',
    },
    {
      field: 'responsable',
      headerName: t('usuario'),
      width: 150,
      valueGetter: ({ row }: GridValueGetterParams) => row.responsable,
    },
    {
      field: 'efectivo',
      headerName: t('efectivo'),
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        formatCurrency(row.totalEfectivo),
    },
    {
      field: 'depositos',
      headerName: t('depositos'),
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        formatCurrency(row.totalDeposito),
    },
    {
      field: 'egresos',
      headerName: t('egresos'),
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        formatCurrency(row.totalEgreso),
    },
    {
      field: 'acciones',
      width: 100,
      headerName: t('acciones'),
      renderCell: (params: GridValueGetterParams) => (
        <ActionsColumn
          actions={[
            {
              id: 'verDetalles',
              onClick: () => setShowModal({ show: true, item: params.row }),
              icon: <EditIcon />,
              title: t('verDetalles'),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box display="flex" flexDirection="column" flex="100%" sx={{ mt: 2 }}>
      <ArqueoDetalleModal
        show={showModal.show}
        item={showModal.item}
        handleClose={() => setShowModal({ show: false, item: undefined })}
      />
      <Box
        sx={{
          height: 60,
          mb: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 6,
          flex: 1,
          width: '100%',
        }}
      >
        <ArqueoFilterModal />
      </Box>
      <DataGridEirete
        config={{
          columns,
          isLoading,
          noRowsLabel: t('noRowsLabel'),
          labelRowsPerPage: t('labelRowsPerPage'),
          onPageChange,
          onPageSizeChange,
          paginationState: pagination,
          rows: arqueosData,
          title: t('title'),
          total: arqueos?.total || 0,
          handleSearch,
          showSearchBar: false,
        }}
      />
    </Box>
  );
};

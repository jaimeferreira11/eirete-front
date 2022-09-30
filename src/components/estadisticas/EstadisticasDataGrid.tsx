import { PedidoDetalleModal } from '@components/pedidos/pedidoModal/PedidoDetalleModal';
import {
  ActionsColumn,
  DataGridEirete,
} from '@components/ui/DataGridComponents';
import { IPedidoResponse, ListPaginationOptions } from '@core/interfaces';
import {
  useEstadisticasPedidoPaginado,
  useEstadisticasProvider,
} from '@lib/hooks';
import { ReceiptLongOutlined as EditIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { formatCurrency, formateDate } from 'src/utils';

export const EstadisticasDataGrid = () => {
  const { t } = useTranslation('estadisticas', { keyPrefix: 'pedidos' });
  const [pedidos, setPedidos] = useState<IPedidoResponse[]>([]);

  const { fechaDesdeFilter, fechaHastaFilter, sucursalId } =
    useEstadisticasProvider();
  const [showModal, setShowModal] = useState<{
    show: boolean;
    item: IPedidoResponse | undefined;
  }>({ show: false, item: undefined });

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page * prev.limite }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const {
    isLoading,
    pedidos: pedidosDB,
    mutate,
  } = useEstadisticasPedidoPaginado(
    pagination,
    sucursalId,
    fechaDesdeFilter,
    fechaHastaFilter
  );

  useMemo(() => {
    setPedidos(pedidosDB?.data || []);
  }, [pedidosDB?.data]);

  const columns: GridColDef[] = [
    {
      field: 'nro',
      headerName: t('nroOrden'),
      width: 100,
      valueGetter: (params: GridValueGetterParams) => params.row.nro,
    },
    {
      field: 'fecha',
      headerName: t('fecha'),
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        formateDate(params.row.fecha),
    },
    {
      field: 'cliente',
      headerName: t('cliente'),
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.cliente?.persona.ruc
          ? `${params.row.cliente?.persona.ruc} • ${params.row.cliente?.persona?.nombreApellido} `
          : `${params.row.cliente?.persona.nroDoc} • ${params.row.cliente?.persona?.nombreApellido}`,
    },
    {
      field: 'tipo',
      headerName: t('tipo'),
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.tipoPedido,
    },
    {
      field: 'total',
      headerName: t('total'),
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        formatCurrency(params.row.importeTotal),
    },
    {
      field: 'estado',
      headerName: t('estado'),
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        formatCurrency(params.row.estadoPedido),
    },
    // {
    //   field: 'pedido',
    //   headerName: t('pedido'),
    //   flex: 1,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     getPedidoString(params.row.detalles as IPedidoDetalle[]),
    // },
    // {
    //   field: 'estado',
    //   headerName: t('form.estado'),

    //   renderCell: (params: GridValueGetterParams) =>
    //     params.row.estado ? (
    //       <Chip color="success" label={t('form.active')} variant="outlined" />
    //     ) : (
    //       <Chip color="error" label={t('form.deactive')} variant="outlined" />
    //     ),
    // },
    {
      field: 'actions',
      headerName: t('actions'),
      description: t('actionsDescription'),

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
    <Box display="flex" flex={1} sx={{ mt: 2, height: '50%' }}>
      <PedidoDetalleModal
        item={showModal.item}
        show={showModal.show}
        handleClose={() => setShowModal({ show: false, item: undefined })}
      />
      <DataGridEirete
        config={{
          columns,
          isLoading,
          noRowsLabel: t('noRowsLabel'),
          labelRowsPerPage: t('labelRowsPerPage'),
          onPageChange,
          onPageSizeChange,
          paginationState: pagination,
          rows: pedidos || [],
          title: t('title'),
          total: pedidosDB?.total || 0,
          showSearchBar: false,
          zeroHeight: true,
        }}
        showActive={false}
      />
    </Box>
  );
};

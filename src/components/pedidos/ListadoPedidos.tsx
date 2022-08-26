import { DataGridEirete } from '@components/ui/DataGridComponents';
import { Box } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { ActionsColumn } from '../ui/DataGridComponents/ActionsColumn';

import {
  IPedidoDetalle,
  IPedidoResponse,
  ListPaginationOptions,
} from '@core/interfaces';
import { usePedidosPaginado } from '@lib/hooks';
import {
  HighlightOffOutlined as DeleteIcon,
  ReceiptLongOutlined as EditIcon,
} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { formatCurrency, formateDate } from 'src/utils';
import { PedicoCancelacionModal } from './pedidoModal/PedicoCancelacionModal';
import { PedidoDetalleModal } from './pedidoModal/PedidoDetalleModal';
import { getPedidoString } from './utils';

export const ListadoPedidos = () => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'listado' });
  const [pedidos, setPedidos] = useState<IPedidoResponse[]>([]);
  const [showModal, setShowModal] = useState<{
    show: boolean;
    item: IPedidoResponse | undefined;
  }>({ show: false, item: undefined });

  const [stateCancelationModal, setStateCancelationModal] = useState({
    show: false,
    nroPedido: 0,
    pedidoId: '',
  });

  const [search, setSearch] = useState({ search: '', active: 'true' });
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
  } = usePedidosPaginado(
    `/pedidos?paginado=true&limite=${pagination.limite}&desde=${pagination.desde}`,
    search.search,
    search.active
  );

  useMemo(() => {
    setPedidos(pedidosDB?.data || []);
  }, [pedidosDB?.data]);
  console.log('pedidos', pedidos);

  formateDate('2022-08-24T19:44:39.394Z');
  // /pedidos?limite=20&desde=0&paginado=true
  const columns: GridColDef[] = [
    {
      field: 'nro',
      headerName: t('nroOrden'),
      width: 100,
      valueGetter: (params: GridValueGetterParams) => params.row.nro,
    },
    {
      field: 'hora',
      headerName: t('hora'),
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
    {
      field: 'pedido',
      headerName: t('pedido'),
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        getPedidoString(params.row.detalles as IPedidoDetalle[]),
    },
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
            {
              id: 'cancelar',
              onClick: () =>
                setStateCancelationModal({
                  show: true,
                  nroPedido: params.row.nro,
                  pedidoId: params.row._id,
                }),
              icon: <DeleteIcon />,
              title: t('cancelar'),
              disabled: params.row.estadoPedido === 'CANCELADO',
            },
          ]}
        />
      ),
    },
  ];

  const handleSearch = (query: string, active: string) => {
    setSearch({ search: query, active });
  };

  return (
    <Box display="flex" flex="100%" sx={{ mt: 2 }}>
      <PedidoDetalleModal
        item={showModal.item}
        show={showModal.show}
        handleClose={() => setShowModal({ show: false, item: undefined })}
      />
      <PedicoCancelacionModal
        handleClose={() =>
          setStateCancelationModal({ show: false, nroPedido: 0, pedidoId: '' })
        }
        mutate={mutate}
        show={stateCancelationModal.show}
        nroPedido={stateCancelationModal.nroPedido}
        pedidoId={stateCancelationModal.pedidoId}
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
          rows: pedidos,
          title: t('title'),
          total: pedidosDB?.total || 0,
          handleSearch,
        }}
        showActive={false}
      />
    </Box>
  );
};

import { useMemo, useState } from 'react';

import { ReceiptLongOutlined as EditIcon } from '@mui/icons-material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Chip, Grid, Typography } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { useTranslation } from 'next-i18next';

import { PedidoDetalleModal } from '@components/pedidos/pedidoModal/PedidoDetalleModal';
import {
  ActionsColumn,
  DataGridEirete,
} from '@components/ui/DataGridComponents';
import { IPedidoResponse, ListPaginationOptions } from '@core/interfaces';
import { usePedidosEstadoDeliveryPaginado } from '@lib/hooks';
import { formatCurrency, formateDate } from 'src/utils';
import {
  DeliveryEstado,
  DeliveryEstadoArray,
  DeliveryEstadoColors,
} from '../../core/interfaces/delivery';
import { DeliveryChangeStateModal } from './DeliveryChangeStateModal';

type colorChip =
  | 'error'
  | 'default'
  | 'warning'
  | 'info'
  | 'success'
  | 'primary'
  | 'secondary'
  | undefined;

export const DeliveryDataGrid = () => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'delivery' });
  const { t: tTable } = useTranslation('pedidos', {
    keyPrefix: 'delivery.table',
  });

  const [pedidosData, setPedidosData] = useState<IPedidoResponse[]>([]);
  const [search, setSearch] = useState({ search: '', active: 'true' });
  const [estadoDelivery, setEstadoDelivery] = useState<DeliveryEstado>('TODOS');

  const [showModal, setShowModal] = useState<{
    show: boolean;
    item: IPedidoResponse | undefined;
  }>({ show: false, item: undefined });

  const [showModalChangeStatus, setShowModalChangeStatus] = useState<{
    show: boolean;
    item: IPedidoResponse | undefined;
  }>({ show: false, item: undefined });

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const { isLoading, pedidos, mutate } = usePedidosEstadoDeliveryPaginado(
    estadoDelivery,
    pagination.limite,
    pagination.desde,
    search.search
  );

  useMemo(() => {
    setPedidosData(pedidos?.data || []);
  }, [pedidos?.data]);

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
    setEstadoDelivery(newEstado as DeliveryEstado);
  };

  const handleDeactivation = async () => {};
  // columnas
  const columns: GridColDef[] = [
    {
      field: 'nroOrden',
      headerName: tTable('nroOrden'),
      width: 100,
      valueGetter: ({ row }: GridValueGetterParams) => row.nro,
    },

    {
      field: 'hora',
      width: 100,
      headerName: tTable('hora'),
      valueGetter: ({ row }: GridValueGetterParams) => formateDate(row.fecha),
    },
    {
      field: 'cliente',
      headerName: tTable('cliente'),
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) =>
        row.cliente?.persona.nombreApellido ?? '',
    },
    {
      field: 'total',
      headerName: tTable('total'),
      renderCell: ({ row }: GridValueGetterParams) =>
        formatCurrency(row.importeTotal),
    },
    {
      field: 'estado',
      headerName: tTable('estado'),
      flex: 1,
      renderCell: ({ row }: GridValueGetterParams) => (
        <Chip
          color={
            DeliveryEstadoColors[
              `${row.estadoDelivery as DeliveryEstado}`
            ] as colorChip
          }
          label={row.estadoDelivery}
          variant="outlined"
          clickable
          onClick={() => setShowModalChangeStatus({ show: true, item: row })}
        />
      ),
    },
    {
      field: 'acciones',
      width: 100,
      headerName: tTable('acciones'),
      renderCell: (params: GridValueGetterParams) => (
        <ActionsColumn
          actions={[
            {
              id: 'verDetalles',
              onClick: () => setShowModal({ show: true, item: params.row }),
              icon: <EditIcon />,
              title: tTable('verDetalles'),
            },
            {
              id: 'descargaPdf',
              onClick: () => {}, // TODO descarga de pdfs
              icon: <PictureAsPdfOutlinedIcon />,
              title: tTable('descargaPdf'),
            },
            //
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {/* <ModalConfirmation
        onCancel={() => {
          setOpenRemoveModal(false);
          setEditUser(undefined);
        }}
        message={t('confirmDeactivation')}
        open={openRemoveModal}
        onAccept={handleDeactivation}
        title={t('userDeactivation')}
      /> */}
      <DeliveryChangeStateModal
        show={showModalChangeStatus.show}
        pedidoId={showModalChangeStatus.item?._id!}
        estadoActual={
          showModalChangeStatus.item?.estadoDelivery as DeliveryEstado
        }
        handleClose={(needMutate) => {
          if (needMutate) mutate();
          setShowModalChangeStatus({ show: false, item: undefined });
        }}
      />
      <PedidoDetalleModal
        item={showModal.item}
        show={showModal.show}
        handleClose={() => setShowModal({ show: false, item: undefined })}
      />
      <Grid direction="column" container sx={{ width: '100%', p: 3 }}>
        <Grid
          xs={1}
          item
          container
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h1" component="h1">
              {t('title')}
            </Typography>
          </Grid>
        </Grid>

        <Grid xs={11} item>
          <DataGridEirete
            config={{
              columns,
              isLoading,
              noRowsLabel: tTable('noRowsLabel'),
              labelRowsPerPage: tTable('labelRowsPerPage'),
              onPageChange,
              onPageSizeChange,
              paginationState: pagination,
              rows: pedidosData,
              title: t('title'),
              total: pedidos?.total || 0,
              handleSearch,
              optionsDropDown: {
                initialValue: estadoDelivery,
                label: tTable('estado'),
                options: [
                  { value: 'TODOS', description: 'TODOS' },
                  ...DeliveryEstadoArray,
                ],
              },
            }}
            showActive={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

import { FC, useMemo, useState } from 'react';

import {
  EditOutlined as EditIcon,
  ReceiptLongOutlined,
} from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import { Button, Chip, Grid } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { useTranslation } from 'next-i18next';

import {
  ActionsColumn,
  DataGridEirete,
} from '@components/ui/DataGridComponents';
import { IArticuloMovimiento, ListPaginationOptions } from '@core/interfaces';
import {
  EstadoMovimientoArticulo,
  useArticulosMovimiento,
} from '@core/services';
import { useUtilsProvider } from '@lib/hooks';
import { formateDate } from 'src/utils';
import { EnviarRecibirModal } from './EnviarRecibirModal';
import { ReponerStockModal } from './ReponerStockModal';

interface Props {
  estado: EstadoMovimientoArticulo;
  sucursalId: string;
  children?: React.ReactNode;
}

export const MovimientoArticuloDataGrid: FC<Props> = ({
  estado,
  sucursalId,
}) => {
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'listado',
  });

  const { showSnackbar } = useUtilsProvider();

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });
  const [articulos, setArticulos] = useState<IArticuloMovimiento[]>([]);
  const [search, setSearch] = useState({ search: '', active: 'true' });

  const [showModal, setShowModal] = useState<{
    show: boolean;
    envio: IArticuloMovimiento | undefined;
    isOnlyRead?: boolean;
  }>({
    show: false,
    envio: undefined,
    isOnlyRead: false,
  });

  const {
    isLoading,
    articulos: articulosDB,

    mutate,
  } = useArticulosMovimiento({
    pagination,
    sucursalId,
    estado,
  });

  useMemo(() => {
    setArticulos(articulosDB?.data || []);
  }, [articulosDB?.data]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page * prev.limite }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const handleCloseModal = () => {
    setShowModal({ show: false, envio: undefined, isOnlyRead: false });
    mutate();
  };

  const handleSearch = (query: string, active: string) => {
    setSearch({ search: query, active });
  };

  const getColumns = (): GridColDef[] => {
    if (estado === 'RECHAZADO' || estado === 'FINALIZADO')
      return [
        {
          field: 'fecha',
          headerName: t('fecha'),
          width: 200,
          valueGetter: (params: GridValueGetterParams) =>
            formateDate(params.row.fechaModif),
        },
        {
          field: 'enviadoPor',
          headerName:
            estado === 'RECHAZADO' ? 'Rechazado por' : t('enviadoPor'),
          width: 200,
          valueGetter: (params: GridValueGetterParams) =>
            estado === 'RECHAZADO'
              ? params.row.usuarioModif?.username || ''
              : params.row.usuarioAlta?.username || '',
        },
        {
          field: 'enviadoDesde',
          headerName: estado === 'RECHAZADO' ? 'Rechazado desde' : 'Enviado a',
          width: 200,
          valueGetter: (params: GridValueGetterParams) =>
            estado === 'RECHAZADO'
              ? params.row.sucursalDestino?.descripcion
              : params.row.sucursalDestino?.descripcion,
        },
        {
          field: 'estado',
          headerName: t('estado'),
          flex: 1,
          renderCell: (params: GridValueGetterParams) => (
            <Chip
              color={
                params.row.estado === 'PENDIENTE'
                  ? 'info'
                  : params.row.estado === 'ATENCION'
                  ? 'warning'
                  : params.row.estado === 'FINALIZADO'
                  ? 'success'
                  : 'error'
              }
              label={params.row.estado}
              variant="outlined"
            />
          ),
        },
        {
          field: 'detalles',
          headerName: '',
          flex: 1,
          renderCell: (params: GridValueGetterParams) => (
            <Button
              color="secondary"
              onClick={() =>
                setShowModal({
                  show: true,
                  envio: params.row,
                  isOnlyRead: true,
                })
              }
              startIcon={<ReceiptLongOutlined />}
            >
              {' '}
              Ver detalles
            </Button>
          ),
        },
      ];

    return [
      {
        field: 'fecha',
        headerName: t('fecha'),
        width: 150,
        valueGetter: (params: GridValueGetterParams) =>
          formateDate(params.row.fechaModif),
      },
      {
        field: 'enviadoPor',
        headerName: t('enviadoPor'),
        width: 150,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.usuarioAlta?.username || '',
      },
      {
        field: 'enviadoDesde',
        headerName: t('enviadoDesde'),
        width: 150,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.sucursalOrigen?.descripcion,
      },
      {
        field: 'enviadoA',
        headerName: 'Enviado a',
        width: 150,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.sucursalDestino?.descripcion,
      },
      {
        field: 'estado',
        headerName: t('estado'),
        flex: 1,
        renderCell: (params: GridValueGetterParams) => (
          <Chip
            color={
              params.row.estado === 'PENDIENTE'
                ? 'info'
                : params.row.estado === 'ATENCION'
                ? 'warning'
                : params.row.estado === 'FINALIZADO'
                ? 'success'
                : 'error'
            }
            label={params.row.estado}
            variant="outlined"
          />
        ),
      },
      {
        field: 'detalles',
        headerName: '',
        flex: 1,
        renderCell: (params: GridValueGetterParams) => (
          <Button
            color="secondary"
            onClick={() =>
              setShowModal({ show: true, envio: params.row, isOnlyRead: true })
            }
            startIcon={<ReceiptLongOutlined />}
          >
            {' '}
            Ver detalles
          </Button>
        ),
      },
      {
        field: 'acciones',
        headerName: t('acciones'),
        description: t('actionsDescription'),

        renderCell: (params: GridValueGetterParams) => (
          <ActionsColumn
            actions={
              params.row.estado === 'RECHAZADO' ||
              params.row.estado === 'FINALIZADO'
                ? [
                    {
                      id: 'movimientoRechazado',
                      title: 'Sin acciones',
                      icon: <BlockIcon />,
                      onClick: () => {},
                    },
                  ]
                : [
                    {
                      id: 'enviarRechazar',
                      onClick: () => {
                        setShowModal({
                          show: true,
                          envio: params.row,
                          isOnlyRead: false,
                        });
                      },
                      icon: <EditIcon />,
                      title:
                        estado === 'PENDIENTE'
                          ? t('enviarRechazar')
                          : t('reponerStock'),
                    },
                  ]
            }
          />
        ),
      },
    ];
  };

  return (
    <>
      {(estado === 'PENDIENTE' ||
        estado === 'FINALIZADO' ||
        estado === 'RECHAZADO') && (
        <EnviarRecibirModal
          open={showModal.show}
          envio={showModal.envio}
          isOnlyRead={showModal.isOnlyRead}
          handleClose={handleCloseModal}
        />
      )}
      {estado === 'ATENCION' && (
        <ReponerStockModal
          open={showModal.show}
          envio={showModal.envio}
          isOnlyRead={showModal.isOnlyRead}
          handleClose={handleCloseModal}
        />
      )}
      <Grid direction="column" container sx={{ width: '100%', p: 3 }}>
        <Grid xs={11} item>
          <DataGridEirete
            config={{
              columns: getColumns(),
              isLoading: isLoading,
              noRowsLabel: t('noRowsLabel'),
              labelRowsPerPage: t('labelRowsPerPage'),
              onPageChange,
              onPageSizeChange,
              paginationState: pagination,
              rows: articulos,
              title: t('title'),
              total: articulosDB?.total || 0,
              handleSearch,
            }}
            showActive={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

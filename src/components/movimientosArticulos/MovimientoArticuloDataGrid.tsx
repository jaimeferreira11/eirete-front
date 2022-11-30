import { FC, useMemo, useState } from 'react';

import { EditOutlined as EditIcon } from '@mui/icons-material';
import { Grid } from '@mui/material';
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
  }>({
    show: false,
    envio: undefined,
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
    setShowModal({ show: false, envio: undefined });
    mutate();
  };

  const handleSearch = (query: string, active: string) => {
    setSearch({ search: query, active });
  };

  // columnas
  const columns: GridColDef[] = [
    {
      field: 'fecha',
      headerName: t('fecha'),
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        formateDate(params.row.fechaModif),
    },
    {
      field: 'enviadoPor',
      headerName: t('enviadoPor'),
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.usuarioModif?.username || '',
    },
    {
      field: 'enviadoDesde',
      headerName: t('enviadoDesde'),
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.sucursalOrigen?.descripcion,
    },
    {
      field: 'estado',
      headerName: t('estado'),
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.estado,
    },
    {
      field: 'acciones',
      headerName: t('acciones'),
      description: t('actionsDescription'),

      renderCell: (params: GridValueGetterParams) => (
        <ActionsColumn
          actions={[
            {
              id: 'enviarRechazar',
              onClick: () => {
                setShowModal({ show: true, envio: params.row });
              },
              icon: <EditIcon />,
              title:
                estado === 'PENDIENTE'
                  ? t('enviarRechazar')
                  : t('reponerStock'),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {estado === 'PENDIENTE' && (
        <EnviarRecibirModal
          open={showModal.show}
          envio={showModal.envio}
          handleClose={handleCloseModal}
        />
      )}
      {estado === 'ATENCION' && (
        <ReponerStockModal
          open={showModal.show}
          envio={showModal.envio}
          handleClose={handleCloseModal}
        />
      )}
      <Grid direction="column" container sx={{ width: '100%', p: 3 }}>
        <Grid xs={11} item>
          <DataGridEirete
            config={{
              columns,
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

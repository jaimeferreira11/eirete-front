import { useMemo, useState } from 'react';

import {
  EditOutlined as EditIcon,
  PersonRemoveOutlined as DeleteIcon,
} from '@mui/icons-material';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { useTranslation } from 'next-i18next';

import ModalConfirmation from '@components/ui/ConfirmationModal/ModalConfirmation';
import {
  ActionsColumn,
  DataGridEirete,
} from '@components/ui/DataGridComponents';
import { ICliente, ListPaginationOptions } from '@core/interfaces';
import {
  useClienteProvider,
  useClientes,
  useSnackbarProvider,
} from '@lib/hooks';
import { ClientesForm } from './ClientesForm';

export const ClienteDataGrid = () => {
  const { t } = useTranslation('clientesABM');

  const { showSnackbar } = useSnackbarProvider();
  const { changeStatus } = useClienteProvider();

  const [clientes, setClientes] = useState<ICliente[]>([]);

  const [editCliente, setEditCliente] = useState<ICliente | undefined>(
    undefined
  );

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const [search, setSearch] = useState({ search: '', active: 'true' });

  const [showModal, setShowModal] = useState(false);

  const {
    isLoading,
    clientes: clientesDB,
    mutate,
  } = useClientes(
    `/clientes?paginado=true&limite=${pagination.limite}&desde=${pagination.desde}`,
    search.search,
    search.active
  );

  useMemo(() => {
    setClientes(clientesDB?.data || []);
  }, [clientesDB?.data]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page * prev.limite }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditCliente(undefined);
    mutate();
  };

  const handleSearch = (query: string, active: string) => {
    setSearch({ search: query, active });
  };

  const handleDeactivation = async () => {
    console.log('editCliente', editCliente);
    const result = await changeStatus(editCliente?._id!, !editCliente?.estado);

    if (!result.hasError) {
      showSnackbar({
        message: t('clienteUpdated'),
        type: 'success',
        show: true,
      });
      setEditCliente(undefined);
      setOpenRemoveModal(false);
      mutate();
    } else {
      showSnackbar({
        message: result.message || t('clientePersistError'),
        type: 'error',
        show: true,
      });
      setOpenRemoveModal(false);
    }
  };
  // columnas
  const columns: GridColDef[] = [
    {
      field: 'persona.nombreApellido',
      headerName: t('form.nombreApellido'),
      flex: 1,
      renderCell: (params: GridValueGetterParams) =>
        params.row.persona.nombreApellido,
    },
    {
      field: 'persona.nroDoc',
      headerName: t('form.nroDoc'),
      width: 200,
      renderCell: (params: GridValueGetterParams) => params.row.persona.nroDoc,
    },
    {
      field: 'persona.tipoDoc',
      headerName: t('form.tipoDoc'),
      width: 200,
      renderCell: (params: GridValueGetterParams) => params.row.persona.tipoDoc,
    },
    {
      field: 'estado',
      headerName: t('form.estado'),

      renderCell: (params: GridValueGetterParams) =>
        params.row.estado ? (
          <Chip color="success" label={t('form.active')} variant="outlined" />
        ) : (
          <Chip color="error" label={t('form.deactive')} variant="outlined" />
        ),
    },
    {
      field: 'actions',
      headerName: t('form.actions'),
      description: t('form.actionsDescription'),

      renderCell: (params: GridValueGetterParams) => (
        <ActionsColumn
          actions={[
            {
              id: 'editar',
              onClick: () => {
                setEditCliente(params.row);
                setShowModal(true);
              },
              icon: <EditIcon />,
              title: t('form.edit'),
            },
            {
              id: 'desactivar',
              onClick: () => {
                setOpenRemoveModal(true);
                setEditCliente(params.row);
              },
              icon: <DeleteIcon />,
              title: t('form.remove'),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <ClientesForm
        open={showModal}
        handleClose={handleCloseModal}
        cliente={editCliente}
      />
      <ModalConfirmation
        onCancel={() => {
          setOpenRemoveModal(false);
          setEditCliente(undefined);
        }}
        message={t('confirmDeactivation')}
        open={openRemoveModal}
        onAccept={handleDeactivation}
        title={t('clienteDeactivation')}
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
          <Grid item>
            <Button
              variant="outlined"
              sx={{
                color: '#000',
                p: 1,
              }}
              onClick={() => setShowModal(true)}
            >
              {t('newCliente')}
            </Button>
          </Grid>
        </Grid>

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
              rows: clientes,
              title: t('title'),
              total: clientesDB?.total || 0,
              handleSearch,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

import { useMemo, useState } from 'react';

import {
  AddOutlined,
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
import { IUser, ListPaginationOptions } from '@core/interfaces';
import { useSnackbarProvider, useUserProvider, useUsers } from '@lib/hooks';
import { UsuarioForm } from './UsuarioForm';

export const UsersDataGrid = () => {
  const { t } = useTranslation('usersABM');

  const { deactivateUser } = useUserProvider();
  const { showSnackbar } = useSnackbarProvider();

  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [search, setSearch] = useState({ search: '', active: 'true' });

  const [editUser, setEditUser] = useState<IUser | undefined>(undefined);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const [showModal, setShowModal] = useState(false);

  const { isLoading, users, mutate } = useUsers(
    `/usuarios?paginado=true&limite=${pagination.limite}&desde=${pagination.desde}`,
    search
  );

  useMemo(() => {
    setUsuarios(users?.data || []);
  }, [users?.data]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page * prev.limite }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(undefined);
    mutate();
  };

  const handleSearch = (query: string, active: string) => {
    setSearch({ search: query, active });
  };

  const handleDeactivation = async () => {
    const result = await deactivateUser(editUser?._id!);

    if (!result.hasError) {
      showSnackbar({
        message: t('usuarioUpdated'),
        type: 'success',
        show: true,
      });
      setEditUser(undefined);
      setOpenRemoveModal(false);
      mutate();
    } else {
      showSnackbar({
        message: result.message || t('usuarioPersistError'),
        type: 'error',
        show: true,
      });
      setOpenRemoveModal(false);
    }
  };
  // columnas
  const columns: GridColDef[] = [
    { field: 'username', headerName: t('form.username'), width: 100 },
    {
      field: 'nombreApellido',
      headerName: t('form.nombreApellido'),
      flex: 1,
    },
    {
      field: 'sucursal',
      headerName: t('form.sucursal'),
      flex: 1,
      renderCell: (params: GridValueGetterParams) =>
        params.row.sucursal.descripcion,
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
                setEditUser(params.row);
                setShowModal(true);
              },
              icon: <EditIcon />,
              title: t('form.edit'),
            },
            {
              id: 'desactivar',
              onClick: () => {
                setOpenRemoveModal(true);
                setEditUser(params.row);
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
      <UsuarioForm
        open={showModal}
        handleClose={handleCloseModal}
        user={editUser}
      />
      <ModalConfirmation
        onCancel={() => {
          setOpenRemoveModal(false);
          setEditUser(undefined);
        }}
        message={t('confirmDeactivation')}
        open={openRemoveModal}
        onAccept={handleDeactivation}
        title={t('userDeactivation')}
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
              sx={{
                color: '#000',
                p: 1,
              }}
              onClick={() => setShowModal(true)}
              startIcon={<AddOutlined />}
            >
              {t('newUser')}
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
              rows: usuarios,
              title: t('title'),
              total: users?.total || 0,
              handleSearch,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

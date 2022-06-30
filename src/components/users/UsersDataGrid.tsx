import { useMemo, useState } from 'react';

import { Button, Chip, Grid, Typography } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { DataGridEirete } from '@components/ui/DataGridComponents';
import { UsuarioForm } from '@components/ui/Users/UsuarioForm';
import { IUser, ListPaginationOptions } from '@core/interfaces';
import { useUsers } from '@lib/hooks';
import { useTranslation } from 'next-i18next';

const columns: GridColDef[] = [
  { field: 'username', headerName: 'Username', width: 100 },
  { field: 'nombreApellido', headerName: 'Nombre y apellido', width: 300 },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 300,
    renderCell: (params: GridValueGetterParams) =>
      params.row.estado ? (
        <Chip color="success" label="Activo" variant="outlined" />
      ) : (
        <Chip color="error" label="Inactivo" variant="outlined" />
      ),
  },
  // {
  //   field: 'paid',
  //   headerName: 'Payment',
  //   description: 'Show if the order is paid',
  //   width: 200,
  //   renderCell: (params: GridValueGetterParams) =>
  //     params.row.paid ? (
  //       <Chip color="success" label="Paid" variant="outlined" />
  //     ) : (
  //       <Chip color="error" label="Pending payment" variant="outlined" />
  //     ),
  // },
  // {
  //   field: 'orderlink',
  //   headerName: 'Order detail',
  //   width: 200,
  //   sortable: false,
  //   editable: false,
  //   renderCell: (params: GridValueGetterParams) => (
  //     <NextLink href={`/orders/${params.row.id}`} passHref prefetch={false}>
  //       <Link color="secondary" underline="always">
  //         Go to detail
  //       </Link>
  //     </NextLink>
  //   ),
  // },
];

export const UsersDataGrid = () => {
  const { t } = useTranslation('usersABM');

  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<ListPaginationOptions>({
    desde: 0,
    limite: 10,
  });

  const [showModal, setShowModal] = useState(false);

  const { isLoading, users, mutate } = useUsers(
    `/usuarios?limite=${pagination.limite}&desde=${pagination.desde}`
  );

  useMemo(() => {
    setUsuarios(users?.data || []);
  }, [users?.data]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, desde: page - 1 }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, desde: 0, limite: pageSize }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    mutate();
  };

  return (
    <Grid flexDirection="column" container>
      <UsuarioForm open={showModal} handleClose={handleCloseModal} />
      <Grid item sx={{ mb: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" component="h1">
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
              {t('newUser')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <DataGridEirete
          config={{
            columns,
            isLoading,
            noRowsLabel: t('noRowsLabel'),
            labelRowsPerPage: t('labelRowsPerPage'),
            onPageChange,
            onPageSizeChange,
            paginationState: pagination,
            rows: usuarios,
            title: t('title'),
          }}
        />
      </Grid>
    </Grid>
  );
};

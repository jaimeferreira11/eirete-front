import { IDataGridEireteConfig } from '@lib/interfaces';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FC } from 'react';
import { FilterBox } from './FilterBox';

interface Props {
  config: IDataGridEireteConfig;
  children?: React.ReactNode;
  showActive?: boolean;
}

export const DataGridEirete: FC<Props> = ({ config, showActive = true }) => {
  const {
    columns,
    isLoading,
    labelRowsPerPage,
    noRowsLabel,
    onPageChange,
    onPageSizeChange,
    paginationState,
    rows,
    total,
    handleSearch,
    optionsDropDown,
    showSearchBar = true,
    zeroHeight = false,
  } = config;

  return (
    <>
      <Box
        sx={{
          height: !zeroHeight ? { xs: '60vh', sm: '75vh' } : 'auto',
          width: '100%',
        }}
      >
        {showSearchBar && handleSearch && (
          <FilterBox
            searchHandler={handleSearch}
            isLoading={isLoading}
            showActive={showActive}
            optionsDropDown={optionsDropDown}
          />
        )}
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          pageSize={paginationState.limite}
          paginationMode="server"
          rowCount={total}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          loading={isLoading}
          disableSelectionOnClick
          localeText={{
            noRowsLabel: noRowsLabel,
            MuiTablePagination: {
              labelRowsPerPage: labelRowsPerPage,
              labelDisplayedRows: ({ from, to, count }) => {
                return `${from}–${to} de ${
                  count !== -1 ? count : `más de ${to}`
                }`;
              },
            },
          }}
        />
      </Box>
    </>
  );
};

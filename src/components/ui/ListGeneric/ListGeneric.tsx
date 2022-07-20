import { FC } from 'react';

import { Box, List, TablePagination } from '@mui/material';

import { useTranslation } from 'next-i18next';
import { ListEmpty } from './ListEmpty';
import { IListItemGeneric, ListItemGeneric } from './ListItemGeneric';

export interface IListGenericaData {
  data: IListItemGeneric[];
  totalPages: number;
}

export interface IListGenericaPagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (pageSize: number) => void;
}

interface Props {
  items: IListItemGeneric[];
  pagination: IListGenericaPagination;
  title?: string;
  selected?: string; // match with _id of IListItemGeneric
  emptyText: string;
  onSelect: (_id: string) => void;
  children?: React.ReactNode;
}

export const ListGeneric: FC<Props> = ({
  items,
  pagination,
  title = 'Items',
  selected,
  emptyText,
  onSelect,
}) => {
  const { t } = useTranslation('listGeneric');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    pagination.onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    pagination.onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  if (items.length === 0)
    return <ListEmpty description={emptyText || t('emptyList')} />;

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        sx={{
          width: '100%',
          flex: 0.1,
        }}
      >
        <List
          aria-label={title}
          sx={{
            maxHeight: '55vh',
            overflow: 'scroll',
          }}
        >
          {items.map((item) => (
            <ListItemGeneric
              key={item._id}
              item={item}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </List>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <TablePagination
          component="div"
          sx={{ justifyContent: 'center', display: 'flex' }}
          count={pagination.totalItems}
          page={pagination.currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // rowsPerPageOptions={[5, 10, 20, { value: -1, label: t('all') }]}
          rowsPerPageOptions={[5, 10, 20, 50]}
          labelDisplayedRows={({ from, to, count }) => {
            return (
              '' + from + '-' + to + ` ${t('labelDisplayedRows')} ` + count
            );
          }}
          labelRowsPerPage={`${title} ${t('labelRowsPerPage')}`}
        />
      </Box>
    </Box>
  );
};

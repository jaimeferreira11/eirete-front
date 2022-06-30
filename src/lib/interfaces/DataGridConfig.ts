import { ListPaginationOptions } from '@core/interfaces';
import { GridColDef } from '@mui/x-data-grid';

export interface IDataGridEireteConfig {
  rows: any[];
  columns: GridColDef[];
  paginationState: ListPaginationOptions;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  noRowsLabel: string;
  labelRowsPerPage: string;
  title: string;
}

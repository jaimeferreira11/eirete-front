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
  total: number;
  zeroHeight?: boolean;
  handleSearch?: (
    query: string,
    activate: string,
    optionValue?: string
  ) => void;
  optionsDropDown?:
    | {
        options: { value: any; description: string }[];
        label: string;
        initialValue: string;
      }
    | undefined;
  showSearchBar?: boolean;
}

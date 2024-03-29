import { ChangeEvent, useEffect, useState } from 'react';

import { useAuthProvider, useSucursal } from '@lib/hooks';
import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'debounce';
import { useTranslation } from 'next-i18next';
import { useStockSucursalProvider } from '../../lib/hooks/providers/useStockSucursalProvider';
import { StockSucursalAccordionList } from './StockSucursalAccordionList';
import { StockSucursalEditView } from './StockSucursalEditView';
import { StockSucursalPlaceHolder } from './StockSucursalPlaceHolder';

export const StockSucursalDataGrid = () => {
  const { t } = useTranslation(['stockSucursalABM']);

  const [searchQuery, setSearchQuery] = useState('');

  const { stockSelected, clearStockSucursalSelected } =
    useStockSucursalProvider();

  const onSearch = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(target.value);
  };

  const { sucursales } = useSucursal();
  const { user } = useAuthProvider();

  const [sucursalIdSelected, setSucursalIdSelected] = useState(
    user!.sucursal._id
  );

  useEffect(() => {
    setSucursalIdSelected(user!.sucursal._id);
  }, []);

  const handleChangeSucursal = (event: any) => {
    setSucursalIdSelected(event.target.value);
  };

  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
        paddingBottom={1}
        sx={{
          borderBottom: '0.1em solid #EAEAEA',
        }}
      >
        <Grid xs={4} item>
          {sucursales && (
            <TextField
              select
              size="small"
              label={t('form.sucursal')}
              defaultValue={sucursalIdSelected}
              fullWidth
              onChange={handleChangeSucursal}
            >
              {sucursales?.map((sucursal) => (
                <MenuItem key={sucursal._id} value={sucursal._id}>
                  {sucursal.descripcion}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
      </Grid>
      <Box display="flex" height="100%" width="100%" sx={{}}>
        <Box
          flex={1}
          sx={{
            overflow: 'auto',
            borderRight: '0.1em solid #EAEAEA',
            px: 2,
            py: 2,
          }}
          display="flex"
          flexDirection="column"
        >
          <Grid spacing={2} container sx={{ mb: 0.5 }}>
            <Grid xs={4} item>
              <Typography variant="h4" component="h4">
                {t('title')}
              </Typography>
            </Grid>
          </Grid>

          <TextField
            label={t('search')}
            sx={{ my: 2 }}
            onChange={debounce(onSearch, 500)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <StockSucursalAccordionList
            searchQuery={searchQuery}
            sucursalId={sucursalIdSelected}
          />
        </Box>
        <Box flex={1} sx={{ height: '100%', px: 2, py: 2 }}>
          <Typography variant="h4" component="h2">
            {t('details')}
          </Typography>

          <Box height="100%" flex={1} display="flex">
            {!stockSelected ? (
              <StockSucursalPlaceHolder message={t('articuloSeleccionHelp')} />
            ) : (
              <StockSucursalEditView
                articuloStock={stockSelected}
                onCancel={clearStockSucursalSelected}
                sucursalId={sucursalIdSelected}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

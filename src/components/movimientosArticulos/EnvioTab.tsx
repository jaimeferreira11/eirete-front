import { ChangeEvent, FC, useState } from 'react';

import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'debounce';
import { useTranslation } from 'next-i18next';
import { EnvioArticulosView } from './EnvioArticulosView';
import { EnvioDetalleList } from './EnvioDetalleList';
import SucursalEnvioView from './SucursalEnvioView';

interface Props {
  sucursalId: string;
  children?: React.ReactNode;
}

export const EnvioTab: FC<Props> = ({ sucursalId }) => {
  const { t } = useTranslation('movimientosArticulos', {
    keyPrefix: 'articulos',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(target.value);
  };
  return (
    <Box display="flex" flex="100%" sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="initial"
        flex="45%"
        width="100%"
        sx={{ pl: 2, pr: 2, height: '90%' }}
      >
        <Box>
          <Typography variant="h5" component={'div'}>
            {t('title')}
          </Typography>
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
        </Box>
        {!sucursalId ? (
          <CircularProgress />
        ) : (
          <EnvioArticulosView
            sucursalId={sucursalId}
            searchQuery={searchQuery}
          />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flex="55%"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 2, overflow: 'auto' }}
      >
        <EnvioDetalleList />
        <SucursalEnvioView />
      </Box>
    </Box>
  );
};

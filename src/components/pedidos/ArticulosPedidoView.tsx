import { ChangeEvent, useState } from 'react';

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
import { usePedidosProvider } from '../../lib/hooks/providers/usePedidosProvider';
import { ArticulosAccordionList } from './ArticulosPedidoAccordion';

export const ArticulosPedidoView = () => {
  const { newPedido } = usePedidosProvider();
  const { t } = useTranslation('pedidos', { keyPrefix: 'articulos' });
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(target.value);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow="initial"
      flex="45%"
      width="100%"
      sx={{ pl: 2, pr: 2, height: '90%' }}
    >
      <Box flex="10%">
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
      {!newPedido.sucursal?._id ? (
        <CircularProgress />
      ) : (
        <ArticulosAccordionList sucursalId={newPedido.sucursal._id} />
      )}
    </Box>
  );
};

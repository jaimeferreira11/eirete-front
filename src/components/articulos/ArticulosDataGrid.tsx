import { ChangeEvent, useRef, useState } from 'react';

import { useArticulosProvider } from '@lib/hooks';
import { AddOutlined, SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'debounce';
import { useTranslation } from 'next-i18next';
import { ArticuloDialog } from './ArticuloDialog';
import { ArticuloEditView } from './ArticuloEditView';
import { ArticuloPlaceHolder } from './ArticuloPlaceHolder';
import { ArticulosAccordionList } from './ArticulosAccordionList';

export const ArticulosDataGrid = () => {
  const { t } = useTranslation(['articulosABM']);
  const [searchQuery, setSearchQuery] = useState('');

  const { articuloSelected, clearArticuloSelected } = useArticulosProvider();

  const mutateRef = useRef<null | Function>(null);

  const onSearch = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(target.value);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    if (mutateRef?.current) mutateRef?.current();
  };

  return (
    <>
      <ArticuloDialog open={showModal} handleClose={handleCloseModal} />
      <Box display="flex" height="100%" width="100%" sx={{}}>
        <Box
          flex={1}
          sx={{
            overflow: 'auto',
            borderRight: '0.1em solid #EAEAEA',
            px: 2,
            py: 4,
          }}
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h1" component="h1">
              {t('title')}
            </Typography>
            <Button
              onClick={() => setShowModal(true)}
              startIcon={<AddOutlined />}
            >
              {t('newArticulo')}
            </Button>
          </Box>

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
          <ArticulosAccordionList searchQuery={searchQuery} />
        </Box>
        <Box flex={1} sx={{ height: '100%', px: 2, py: 4 }}>
          <Typography variant="h1" component="h2">
            {t('details')}
          </Typography>

          <Box height="100%" flex={1} display="flex">
            {!articuloSelected ? (
              <ArticuloPlaceHolder message={t('articuloSeleccionHelp')} />
            ) : (
              <ArticuloEditView
                articulo={articuloSelected}
                onCancel={clearArticuloSelected}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

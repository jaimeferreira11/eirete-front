import { FC, useState } from 'react';

import { ArticuloPlaceHolder } from '@components/articulos/ArticuloPlaceHolder';

import {
  useArticulosStockPorLineaSearch,
  useStockLineasSucursal,
} from '@lib/hooks';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ArticulosListEnvio } from './ArticulosListEnvio';
import { ArticuloViewEnvioFromSearch } from './ArticuloViewEnvioFromSearch';

interface Props {
  searchQuery?: string;
  sucursalId: string;
}

export const EnvioArticulosView: FC<Props> = ({ searchQuery, sucursalId }) => {
  const { lineas, isLoading } = useStockLineasSucursal(sucursalId);

  const [loadingArticulos, setLoadingArticulos] = useState<{
    // eslint-disable-next-line no-unused-vars
    [key in string]: boolean;
  }>({});

  const { lineasArticulos, isLoading: isLoadingSearch } =
    useArticulosStockPorLineaSearch(sucursalId, searchQuery);

  // useArticulosStockPorLineaSearch
  const getArticulosLinea = async (lineaId: string, open: boolean) => {
    setLoadingArticulos((prev) => ({ ...prev, [lineaId]: open }));
  };

  if (searchQuery) {
    return (
      <Box flex={1} display="flex" sx={{ overflow: 'auto' }}>
        {isLoadingSearch ? (
          <CircularProgress />
        ) : lineasArticulos?.length === 0 ? (
          <ArticuloPlaceHolder message="Sin coincidencias" />
        ) : (
          <Box alignSelf="start" width="100%">
            {lineasArticulos?.map((linea) => (
              <Accordion
                key={linea._id}
                onChange={(_, value) => getArticulosLinea(linea._id, value)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{linea.descripcion}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={2}
                  >
                    {linea.articulos.map((articulo) => (
                      <ArticuloViewEnvioFromSearch
                        key={articulo._id}
                        articulo={articulo}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>
    );
  }
  //  <ArticuloView key={articulo._id} articulo={articulo} />
  return (
    <Box
      flex="90%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ overflow: 'auto' }}
    >
      {isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Box alignSelf="start" width="100%" sx={{ overflow: 'auto' }}>
          {lineas?.map((linea) => (
            <Accordion
              key={linea._id}
              onChange={(_, value) => getArticulosLinea(linea._id, value)}
              sx={{ border: '1px solid #fff' }}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  bgcolor: '#F3F3F3',
                  borderRadius: 2,
                  mb: 1,
                  height: '48px',
                  '&.Mui-expanded': {
                    maxHeight: '48px',
                    minHeight: '48px',
                  },
                }}
              >
                <Typography>{linea.descripcion}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {loadingArticulos[linea._id] ? (
                  <ArticulosListEnvio
                    lineaId={linea._id}
                    sucursalId={sucursalId}
                  />
                ) : null}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

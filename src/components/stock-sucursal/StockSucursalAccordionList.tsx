import { FC, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useArticulosPorLineaSearch, useLinea } from '@lib/hooks';
import { useStockSucursalProvider } from '@lib/hooks/providers/useStockSucursalProvider';
import { StockSucursalLinea } from './StockSucursalLinea';
import { StockSucursalPlaceHolder } from './StockSucursalPlaceHolder';
import { StockSucursalView } from './StockSucursalView';

interface Props {
  searchQuery?: string;
}

export const StockSucursalAccordionList: FC<Props> = ({ searchQuery }) => {
  const { lineas, isLoading } = useLinea();

  const { lineasArticulos, isLoading: isLoadingSearch } =
    useArticulosPorLineaSearch(searchQuery);

  const { sucursalIdSelected } = useStockSucursalProvider();

  const [loadingArticulos, setLoadingArticulos] = useState<{
    // eslint-disable-next-line no-unused-vars
    [key in string]: boolean;
  }>({});

  const getArticulosLinea = async (lineaId: string, open: boolean) => {
    setLoadingArticulos((prev) => ({ ...prev, [lineaId]: open }));
  };

  if (searchQuery) {
    return (
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ overflow: 'auto' }}
      >
        {isLoadingSearch ? (
          <CircularProgress />
        ) : lineasArticulos?.length === 0 ? (
          <StockSucursalPlaceHolder message="Sin coincidencias" />
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
                      <StockSucursalView
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
      flex={1}
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
        <Box alignSelf="start" width="100%">
          {lineas?.map((linea) => (
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
                {loadingArticulos[linea._id] ? (
                  <StockSucursalLinea lineaId={linea._id} />
                ) : null}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

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
import { ArticuloPlaceHolder } from './ArticuloPlaceHolder';
import { ArticulosLinea } from './ArticulosLinea';
import { ArticuloView } from './ArticuloView';

interface Props {
  searchQuery?: string;
}

export const ArticulosAccordionList: FC<Props> = ({ searchQuery }) => {
  const { lineas, isLoading } = useLinea();

  const { lineasArticulos, isLoading: isLoadingSearch } =
    useArticulosPorLineaSearch(searchQuery);

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
                      <ArticuloView key={articulo._id} articulo={articulo} />
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
                  <ArticulosLinea lineaId={linea._id} />
                ) : null}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

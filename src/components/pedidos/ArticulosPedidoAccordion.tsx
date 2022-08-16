import { FC, useState } from 'react';

import { useStockLineasSucursal } from '@lib/hooks';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ArticulosLineaPedidos } from './ArticulosLineaPedidos';

interface Props {
  searchQuery?: string;
  sucursalId: string;
}

export const ArticulosAccordionList: FC<Props> = ({
  searchQuery,
  sucursalId,
}) => {
  const { lineas, isLoading } = useStockLineasSucursal(sucursalId);

  const [loadingArticulos, setLoadingArticulos] = useState<{
    // eslint-disable-next-line no-unused-vars
    [key in string]: boolean;
  }>({});

  const getArticulosLinea = async (lineaId: string, open: boolean) => {
    setLoadingArticulos((prev) => ({ ...prev, [lineaId]: open }));
  };

  // if (searchQuery) {
  //   return (
  //     <Box
  //       flex={1}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       sx={{ overflow: 'auto' }}
  //     >
  //       {isLoadingSearch ? (
  //         <CircularProgress />
  //       ) : lineasArticulos?.length === 0 ? (
  //         <ArticuloPlaceHolder message="Sin coincidencias" />
  //       ) : (
  //         <Box alignSelf="start" width="100%">
  //           {lineasArticulos?.map((linea) => (
  //             <Accordion
  //               key={linea._id}
  //               onChange={(_, value) => getArticulosLinea(linea._id, value)}
  //             >
  //               <AccordionSummary
  //                 expandIcon={<ExpandMore />}
  //                 aria-controls="panel1a-content"
  //                 id="panel1a-header"
  //               >
  //                 <Typography>{linea.descripcion}</Typography>
  //               </AccordionSummary>
  //               <AccordionDetails>
  //                 <Box
  //                   display="grid"
  //                   gridTemplateColumns="repeat(12, 1fr)"
  //                   gap={2}
  //                 >
  //                   {linea.articulos.map((articulo) => (
  //                     <ArticuloView key={articulo._id} articulo={articulo} />
  //                   ))}
  //                 </Box>
  //               </AccordionDetails>
  //             </Accordion>
  //           ))}
  //         </Box>
  //       )}
  //     </Box>
  //   );
  // }
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
                  <ArticulosLineaPedidos
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

import { GenericTab } from '@components/ui';
import { useAuthProvider } from '@lib/hooks';
import { OptionsTab } from '@lib/interfaces';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { EnvioTab } from './EnvioTab';
import { MovimientoArticuloDataGrid } from './MovimientoArticuloDataGrid';

export const MovimientosArticulosSucursal = () => {
  const { t } = useTranslation('movimientosArticulos');
  const mutateRef = useRef<null | Function>(null);
  const [actualTab, setActualTab] = useState<string>('recibidos');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActualTab(newValue as OptionsTab);
  };

  const { user } = useAuthProvider();

  const [sucursalIdSelected] = useState(user!.sucursal);
  // const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   if (mutateRef?.current) mutateRef?.current();
  // };

  return (
    <>
      {/* <LineaDialog open={showModal} handleClose={handleCloseModal} /> */}

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        sx={{ p: 2, height: '100%' }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderBottom: '0.1em solid #EAEAEA',
          }}
        >
          <Box>
            <Tabs
              value={actualTab}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab value="recibidos" label="Recibidos" className="tab-left" />
              <Tab value="enviados" label="Enviados" className="tab-right" />
              <Tab
                value="rechazados"
                label="Envios Rechazados"
                className="tab-right"
              />
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <>
            <GenericTab value={actualTab} index={'recibidos'}>
              <MovimientoArticuloDataGrid
                estado="PENDIENTE"
                sucursalId={sucursalIdSelected}
              />
            </GenericTab>
            <GenericTab value={actualTab} index={'enviados'}>
              <EnvioTab sucursalId={sucursalIdSelected} />
            </GenericTab>
            <GenericTab value={actualTab} index={'rechazados'}>
              <MovimientoArticuloDataGrid
                estado="ATENCION"
                sucursalId={sucursalIdSelected}
              />
            </GenericTab>
          </>
        </Box>
      </Box>
    </>
  );
};

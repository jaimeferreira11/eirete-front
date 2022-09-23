import { GenericTab } from '@components/ui';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ListadoPedidos } from './ListadoPedidos';
import { PedidoTab } from './PedidoTab';

type OptionsPedidoTab = 'pedidos' | 'listado-pedidos';

export const PedidosGrid = () => {
  const { t } = useTranslation('pedidos');

  const [actualTab, setActualTab] = useState<OptionsPedidoTab>('pedidos');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActualTab(newValue as OptionsPedidoTab);
  };

  return (
    <>
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
              TabIndicatorProps={{
                style: {},
              }}
            >
              <Tab value="pedidos" label="Pedidos" />
              <Tab value="listado-pedidos" label="Listado de pedidos" />
            </Tabs>
          </Box>
        </Box>

        <>
          <GenericTab value={actualTab} index={'pedidos'}>
            <PedidoTab />
          </GenericTab>
          <GenericTab value={actualTab} index={'listado-pedidos'}>
            <ListadoPedidos />
          </GenericTab>
        </>
      </Box>
    </>
  );
};

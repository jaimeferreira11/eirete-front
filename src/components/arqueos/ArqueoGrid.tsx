import { GenericTab } from '@components/ui';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ArqueoLastUser } from './ArqueoLastUser';
import { ListadoArqueos } from './ListadoArqueos';

type OptionsPedidoTab = 'ultimo-arqueo' | 'listado-arqueos';

export const ArqueosGrid = () => {
  const { t: tTabs } = useTranslation('arqueos', { keyPrefix: 'tabs' });

  const [actualTab, setActualTab] = useState<OptionsPedidoTab>('ultimo-arqueo');

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
            >
              <Tab
                value="ultimo-arqueo"
                label={tTabs('ultimoArqueo')}
                className="tab-left"
              />
              <Tab
                value="listado-arqueos"
                label={tTabs('listadoArqueo')}
                className="tab-right"
              />
            </Tabs>
          </Box>
        </Box>

        <>
          <GenericTab value={actualTab} index={'ultimo-arqueo'}>
            <ArqueoLastUser />
          </GenericTab>
          <GenericTab value={actualTab} index={'listado-arqueos'}>
            <ListadoArqueos />
          </GenericTab>
        </>
      </Box>
    </>
  );
};

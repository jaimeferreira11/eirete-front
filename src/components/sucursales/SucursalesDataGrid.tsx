import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Tab, Tabs } from '@mui/material';

import { GenericTab } from '@components/ui';
import { OptionsTab } from '@lib/interfaces';
import { SucursalDialog } from './SucursalDialog';
import { SucursalTab } from './SucursalTab';

export const SucursalesDataGrid = () => {
  const { t } = useTranslation('sucursalesABM');

  const [actualTab, setActualTab] = useState<OptionsTab>('activos');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActualTab(newValue as OptionsTab);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SucursalDialog open={showModal} handleClose={handleCloseModal} />

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        sx={{ p: 2, height: '100%' }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Tabs
              value={actualTab}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab value="activos" label="Activos" />
              <Tab value="inactivos" label="Inactivos" />
            </Tabs>
          </Box>

          <Box>
            <Button
              onClick={() => setShowModal(true)}
              startIcon={<AddOutlined />}
            >
              {t('newSucursal')}
            </Button>
          </Box>
        </Box>
        <Box flexGrow={1} sx={{ height: '100%' }}>
          <>
            <GenericTab value={actualTab} index={'activos'}>
              <SucursalTab tipo="activos" />
            </GenericTab>
            <GenericTab value={actualTab} index={'inactivos'}>
              <SucursalTab tipo="inactivos" />
            </GenericTab>
          </>
        </Box>
      </Box>
    </>
  );
};

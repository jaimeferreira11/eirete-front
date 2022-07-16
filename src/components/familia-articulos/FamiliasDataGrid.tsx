import { GenericTab } from '@components/ui';
import { OptionsTab } from '@lib/interfaces';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FamiliaDialog } from './FamiliaDialog';
import { FamiliaTab } from './FamiliaTab';


export const FamiliasDataGrid = () => {
  const { t } = useTranslation('familiaArticulosABM');

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
      <FamiliaDialog open={showModal} handleClose={handleCloseModal} />

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
              <Tab value="activos" label="Activos" />
              <Tab value="inactivos" label="Inactivos" />
            </Tabs>
          </Box>

          <Box>
            <Button
              onClick={() => setShowModal(true)}
              startIcon={<AddOutlined />}
            >
              {t('newFamilia')}
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <>
            <GenericTab value={actualTab} index={'activos'}>
              <FamiliaTab tipo="activos" />
            </GenericTab>
            <GenericTab value={actualTab} index={'inactivos'}>
              <FamiliaTab tipo="inactivos" />
            </GenericTab>
          </>
        </Box>
      </Box>
    </>
  );
};

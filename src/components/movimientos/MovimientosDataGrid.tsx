import { useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Tab, Tabs } from '@mui/material';

import { GenericTab } from '@components/ui';
import { MovimientoDialog } from './MovimientoDialog';
import { MovimientoTab } from './MovimientoTab';

type OptionsTab = 'ingresos' | 'egresos';

export const MovimientosDataGrid = () => {
  const { t } = useTranslation('movimientosABM');

  const [actualTab, setActualTab] = useState<OptionsTab>('egresos');

  const mutateRef = useRef<null | Function>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActualTab(newValue as OptionsTab);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    if (mutateRef?.current) mutateRef?.current();
  };

  return (
    <>
      <MovimientoDialog
        open={showModal}
        handleClose={handleCloseModal}
        tipo={actualTab}
      />

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
              <Tab value="ingresos" label="Ingresos" className="tab-left" />
              <Tab value="egresos" label="Gastos" className="tab-right" />
            </Tabs>
          </Box>

          <Box>
            <Button
              onClick={() => setShowModal(true)}
              startIcon={<AddOutlined />}
            >
              {t('new')}
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <>
            <GenericTab value={actualTab} index={'ingresos'}>
              <MovimientoTab tipo="ingresos" mutateRef={mutateRef} />
            </GenericTab>
            <GenericTab value={actualTab} index={'egresos'}>
              <MovimientoTab tipo="egresos" mutateRef={mutateRef} />
            </GenericTab>
          </>
        </Box>
      </Box>
    </>
  );
};

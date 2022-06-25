import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Logo } from '..';
import { SideBarListItems } from './SideBarListItems';

export const SideBar = () => {
  const { t } = useTranslation('sidebar');

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: '#FFF',
        borderRadius: 2,
        maxWidth: '240px',
      }}
    >
      <Logo />

      <SideBarListItems t={t} />
    </Box>
  );
};

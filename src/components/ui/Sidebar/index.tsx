import { Box, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Logo } from '..';
import { SideBarListItems } from './SideBarListItems';

export const SideBar = () => {
  const { t } = useTranslation('sidebar');

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      sx={{
        paddingTop: 5,
        border: 'black',
        backgroundColor: '#FFF',
        borderRadius: 2,
      }}
    >
      <Logo />
      <Divider />
      <SideBarListItems t={t} />
    </Box>
  );
};

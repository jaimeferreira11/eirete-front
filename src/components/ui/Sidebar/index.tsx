import { Box, Divider } from '@mui/material';
import { Logo } from '..';
import { MenuUser } from './MenuUser';
import { SideBarListItems } from './SideBarListItems';

export const SideBar = () => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      sx={{
        backgroundColor: '#FFF',
        borderRadius: 2,
        maxWidth: '240px',
        minWidth: '100px',

        overflow: 'scroll',
      }}
    >
      <Logo />

      <SideBarListItems />

      <Box flex={1} />

      <Divider />

      <MenuUser />
    </Box>
  );
};

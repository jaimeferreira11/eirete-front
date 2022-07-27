import { useUtilsProvider } from '@lib/hooks';
import { Box, Divider, Drawer } from '@mui/material';
import { Logo } from '../Sidebar/Logo';
import { SideBarListItems } from '../Sidebar/SideBarListItems';

export const CustomDrawer = () => {
  const { drawer, closeDrawer } = useUtilsProvider();
  return (
    <Drawer anchor="left" open={drawer.show} onClose={closeDrawer}>
      <Box sx={{ width: 250, height: '100%' }} role="presentation">
        <Logo />
        <Divider />
        <SideBarListItems />
      </Box>
    </Drawer>
  );
};

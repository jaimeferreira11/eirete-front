import { useUtilsProvider } from '@lib/hooks';
import GrainIcon from '@mui/icons-material/Grain';
import { Box, Divider, IconButton } from '@mui/material';
import { Logo } from '..';
import { MenuUser } from './MenuUser';
import { SideBarListItems } from './SideBarListItems';

export const SideBar = () => {
  const { showDrawer } = useUtilsProvider();

  return (
    <Box
      flex={1}
      display="flex"
      sx={{
        backgroundColor: '#FFF',
        borderRadius: 2,

        minWidth: '100px',
        flexDirection: { xs: 'row', sm: 'column' },
        maxHeight: { xs: 80, sm: '100%' },
        maxWidth: { xs: '100%', sm: '240px' },

        overflow: 'auto',
      }}
    >
      <IconButton
        onClick={() => {
          showDrawer();
        }}
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <GrainIcon
          color="primary"
          sx={{
            fontSize: 30,
          }}
        />
      </IconButton>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Logo />
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SideBarListItems />
      </Box>

      <Box flex={1} />

      <Divider />

      <MenuUser />
    </Box>
  );
};

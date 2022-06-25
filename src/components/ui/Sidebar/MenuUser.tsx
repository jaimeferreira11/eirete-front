import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useAuthProvider } from '../../../lib/hooks';
export const MenuUser = () => {
  const { t } = useTranslation('sidebar');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openOptions, setOpenOptions] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  const { user, logout } = useAuthProvider();

  // TODO modularizar componente

  return (
    <Box
      padding={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" gap={1}>
        <AccountCircleOutlinedIcon />
        <Typography>{user?.username}</Typography>
      </Box>
      <IconButton id="long-button" onClick={handleClick}>
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 15,
        }}
        open={openOptions}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PrintOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('imprimirArqueo')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContactSupportOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('contactarSoporte')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('cerrarSesion')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

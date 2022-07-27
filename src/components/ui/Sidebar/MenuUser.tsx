import {
  AccountCircleOutlined as UserIcon,
  ContactSupportOutlined as SupportIcon,
  LogoutOutlined as LogoutIcon,
  MoreVertOutlined as MoreIcon,
  PrintOutlined as PrintIcon,
} from '@mui/icons-material';

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
import ModalConfirmation from '../ConfirmationModal/ModalConfirmation';
export const MenuUser = () => {
  const { t } = useTranslation('sidebar');

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openOptions, setOpenOptions] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  const { user, logout } = useAuthProvider();

  const handleCerrarSesion = () => {
    setOpenModal(false);
    logout();
  };

  // TODO modularizar componente

  return (
    <Box
      sx={{ padding: { xs: 0, sm: 2 } }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <ModalConfirmation
        onAccept={handleCerrarSesion}
        onCancel={() => setOpenModal(false)}
        message={t('logoutConfirm')}
        title={t('cerrarSesion')}
        open={openModal}
      />
      <Box display="flex" gap={1}>
        <UserIcon />
        <Typography>{user?.username}</Typography>
      </Box>
      <IconButton id="long-button" onClick={handleClick}>
        <MoreIcon />
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
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('imprimirArqueo')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SupportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('contactarSoporte')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenModal(true);
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('cerrarSesion')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

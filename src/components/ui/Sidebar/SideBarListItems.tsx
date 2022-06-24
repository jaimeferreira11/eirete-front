import {
  DeliveryDiningOutlined as DeliveryIcon,
  Inventory2Outlined as StockIcon,
  LockOutlined as CierreCajaIcon,
  MonitorOutlined as CajaIcon,
  PersonOutlineOutlined as ClientesIcon,
  ShoppingCartOutlined as MovimientosIcon,
} from '@mui/icons-material';

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { TFunction } from 'next-i18next';
import { FC } from 'react';

const menuItems = [
  {
    id: 'caja',
    icon: <CajaIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.caja',
    roles: [''],
  },
  {
    id: 'cierre-caja',
    icon: <CierreCajaIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.cierreDeCaja',
    roles: [''],
  },
  {
    id: 'delivery',
    icon: <DeliveryIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.delivery',
    roles: [''],
  },
  {
    id: 'caja',
    icon: <StockIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.stock',
    roles: [''],
  },
  {
    id: 'movimientos',
    icon: <MovimientosIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.movimientos',
    roles: [''],
  },
  {
    id: 'clientes',
    icon: <ClientesIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />,
    text: 'links.clientes',
    roles: [''],
  },
];

interface Props {
  t: TFunction;
  children?: React.ReactNode;
}

export const SideBarListItems: FC<Props> = ({ t }) => {
  return (
    <Box display="flex" justifyContent="center">
      <List sx={{ width: '100%' }}>
        {menuItems.map((menuItem) => (
          <ListItem
            sx={{ mb: 1, width: '100%', px: { xs: '8.5px', sm: '16px' } }}
            button
            key={menuItem.id}
          >
            <ListItemIcon
              sx={{
                width: '100%',
              }}
            >
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText
              sx={{ display: { xs: 'none', sm: 'block' }, overflow: 'clip' }}
              primary={<Typography>{t(menuItem.text) as any}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

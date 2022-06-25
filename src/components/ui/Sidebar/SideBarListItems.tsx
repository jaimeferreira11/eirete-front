import {
  DeliveryDiningOutlined as DeliveryIcon,
  Inventory2Outlined as StockIcon,
  LockOutlined as CierreCajaIcon,
  MonitorOutlined as CajaIcon,
  PersonOutlineOutlined as ClientesIcon,
  ShoppingCartOutlined as MovimientosIcon,
} from '@mui/icons-material';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { useTranslation } from 'next-i18next';
import { FC } from 'react';

const menuItems = [
  {
    id: 'caja',
    icon: <CajaIcon />,
    text: 'links.caja',
    roles: [''],
  },
  {
    id: 'cierre-caja',
    icon: <CierreCajaIcon />,
    text: 'links.cierreDeCaja',
    roles: [''],
  },
  {
    id: 'delivery',
    icon: <DeliveryIcon />,
    text: 'links.delivery',
    roles: [''],
  },
  {
    id: 'stock',
    icon: <StockIcon />,
    text: 'links.stock',
    roles: [''],
  },
  {
    id: 'movimientos',
    icon: <MovimientosIcon />,
    text: 'links.movimientos',
    roles: [''],
  },
  {
    id: 'clientes',
    icon: <ClientesIcon />,
    text: 'links.clientes',
    roles: [''],
  },
];

interface Props {
  children?: React.ReactNode;
}

export const SideBarListItems: FC<Props> = () => {
  const { t } = useTranslation('sidebar');
  return (
    <List>
      {menuItems.map((menuItem) => (
        <ListItem sx={{ mb: 1 }} button key={menuItem.id}>
          <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
            {menuItem.icon}
          </ListItemIcon>
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'block' }, overflow: 'clip' }}
            primary={
              <Typography sx={{ fontSize: '14px' }}>
                {t(menuItem.text) as any}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

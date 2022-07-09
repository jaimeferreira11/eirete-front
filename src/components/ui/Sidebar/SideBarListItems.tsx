import { FC } from 'react';

import NextLink from 'next/link';

import { useTranslation } from 'next-i18next';

import {
  DeliveryDiningOutlined as DeliveryIcon,
  GroupOutlined as UsuarioIcon,
  Inventory2Outlined as StockIcon,
  LockOutlined as CierreCajaIcon,
  MonitorOutlined as CajaIcon,
  PersonOutlineOutlined as ClientesIcon,
  ShoppingCartOutlined as MovimientosIcon,
  StorefrontOutlined as SucursalIcon,
} from '@mui/icons-material';
import {
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const menuItems = [
  {
    id: 'caja',
    icon: <CajaIcon />,
    text: 'links.caja',
    roles: [''],
    path: '/',
  },
  {
    id: 'cierre-caja',
    icon: <CierreCajaIcon />,
    text: 'links.cierreDeCaja',
    roles: [''],
    path: '/',
  },
  {
    id: 'delivery',
    icon: <DeliveryIcon />,
    text: 'links.delivery',
    roles: [''],
    path: '/',
  },
  {
    id: 'stock',
    icon: <StockIcon />,
    text: 'links.stock',
    roles: [''],
    path: '/',
  },
  {
    id: 'movimientos',
    icon: <MovimientosIcon />,
    text: 'links.movimientos',
    roles: [''],
    path: '/',
  },
  {
    id: 'clientes',
    icon: <ClientesIcon />,
    text: 'links.clientes',
    roles: [''],
    path: '/',
  },
  {
    id: 'sucursales',
    icon: <SucursalIcon />,
    text: 'links.sucursales',
    roles: [''],
    path: '/sucursales',
  },
  {
    id: 'usuarios',
    icon: <UsuarioIcon />,
    text: 'links.usuarios',
    roles: [''],
    path: '/users',
  },
];

interface Props {
  children?: React.ReactNode;
}

export const SideBarListItems: FC<Props> = () => {
  const { t } = useTranslation('sidebar');
  const { asPath } = useRouter();

  return (
    <List>
      {menuItems.map((menuItem) => (
        <NextLink href={menuItem.path} passHref key={menuItem.id}>
          <Link sx={{ color: asPath === menuItem.path ? 'primary' : '#000' }}>
            <ListItemButton
              sx={{
                mb: 1,
              }}
              selected={asPath === menuItem.path ? true : false}
            >
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: asPath !== menuItem.path ? 'primary' : '#fff',
                }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  overflow: 'clip',
                  fontWeight: asPath !== menuItem.path ? 300 : 800,
                }}
                primary={
                  <Typography sx={{ fontSize: '14px' }}>
                    {t(menuItem.text) as any}
                  </Typography>
                }
              />
            </ListItemButton>
          </Link>
        </NextLink>
      ))}
    </List>
  );
};

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import {
  DeliveryDiningOutlined as DeliveryIcon,
  Inventory2Outlined as StockIcon,
  LockOutlined as CierreCajaIcon,
  ManageAccountsOutlined as UserIcon,
  MonitorOutlined as CajaIcon,
  PersonOutlineOutlined as ClientesIcon,
  ShoppingCartOutlined as MovimientosIcon,
  StorefrontOutlined as SucursalIcon,
} from '@mui/icons-material';

import Inventory2Icon from '@mui/icons-material/Inventory2';

import { useUtilsProvider } from '@lib/hooks';
import {
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

export const menuItems = [
  {
    id: 'caja',
    icon: <CajaIcon />,
    text: 'links.caja',
    roles: [''],
    path: '/cajas',
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
    path: '/clientes',
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
    icon: <UserIcon />,
    text: 'links.usuarios',
    roles: [''],
    path: '/users',
  },

  // {
  //   id: 'familia-articulos',
  //   icon: <CategoryIcon />,
  //   text: 'links.familiaArticulos',
  //   roles: [''],
  //   path: '/familia-articulos',
  // },
  {
    id: 'linea-articulos',
    icon: <Inventory2Icon />,
    text: 'links.lineaArticulos',
    roles: [''],
    path: '/linea-articulos',
  },
];

interface Props {
  children?: React.ReactNode;
}

export const SideBarListItems: FC<Props> = () => {
  const { t } = useTranslation('sidebar');
  const { asPath } = useRouter();

  const { closeDrawer } = useUtilsProvider();
  return (
    <List
      sx={{
        maxHeight: 600,
        overflow: 'auto',
      }}
    >
      {menuItems.map((menuItem) => (
        <NextLink href={menuItem.path} passHref key={menuItem.id}>
          <Link sx={{ color: asPath === menuItem.path ? 'primary' : '#000' }}>
            <ListItemButton
              sx={{
                mb: 1,
              }}
              selected={asPath === menuItem.path ? true : false}
              onClick={closeDrawer}
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

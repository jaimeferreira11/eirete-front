import { FC } from 'react';

import {
  BuildOutlined as MaintenanceIcon,
  DeliveryDiningOutlined as DeliveryIcon,
  Inventory as LineaArticuloIcon,
  Inventory2Outlined as StockIcon,
  LockOutlined as CierreCajaIcon,
  ManageAccountsOutlined as UserIcon,
  MonitorOutlined as CajaIcon,
  PersonOutlineOutlined as ClientesIcon,
  ShoppingCartCheckoutOutlined as PedidoIcon,
  ShoppingCartOutlined as MovimientosIcon,
  StorefrontOutlined as SucursalIcon,
  TakeoutDiningOutlined as ArticuloIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { SideBarItem } from './SideBarItem';

export const menuItems = [
  {
    id: 'caja-agrupador',
    icon: <CajaIcon sx={{ mr: 1 }} />,
    text: 'links.caja',
    roles: [''],
    path: '',
    items: [
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
    ],
  },
  {
    id: 'mantenimiento',
    icon: <MaintenanceIcon sx={{ mr: 1 }} />,
    text: 'links.maintenance',
    roles: [''],
    path: '',
    items: [
      {
        id: 'usuarios',
        icon: <UserIcon />,
        text: 'links.usuarios',
        roles: [''],
        path: '/users',
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
        id: 'caja',
        icon: <CajaIcon />,
        text: 'links.caja',
        roles: [''],
        path: '/cajas',
      },
      {
        id: 'linea-articulos',
        icon: <LineaArticuloIcon />,
        text: 'links.lineaArticulos',
        roles: [''],
        path: '/linea-articulos',
      },
      {
        id: 'articulos',
        icon: <ArticuloIcon />,
        text: 'links.articulos',
        roles: [''],
        path: '/articulos',
      },
    ],
  },
  {
    id: 'pedidos',
    icon: <PedidoIcon />,
    text: 'links.pedidos',
    roles: [''],
    path: '/pedidos',
  },
];

interface Props {
  children?: React.ReactNode;
}

export const SideBarListItems: FC<Props> = () => {
  const { t } = useTranslation('sidebar');

  return (
    <List
      sx={{
        maxHeight: 600,
        overflow: 'auto',
      }}
    >
      {menuItems.map(({ id, text, items, icon, path }) =>
        items ? (
          <div key={id}>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box display="flex" alignItems="center">
                  {icon}
                  <Typography sx={{ fontSize: '14px' }}>{t(text)}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {items.map((subMenuItem) => (
                  <SideBarItem
                    key={subMenuItem.id}
                    icon={subMenuItem.icon}
                    path={subMenuItem.path}
                    text={subMenuItem.text}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <SideBarItem key={id} icon={icon} path={path} text={text} />
        )
      )}
    </List>
  );
};

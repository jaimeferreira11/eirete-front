import { FC } from 'react';

import {
  AccountBalanceOutlined as GroupTesoreia,
  CurrencyExchangeOutlined as ArqueoIcon,
  GroupOutlined as ClientesIcon,
  InsertChartOutlined as EstadisticaIcon,
  Inventory2Outlined as LineaArticuloIcon,
  InventoryOutlined as StockIcon,
  LocalAtmOutlined as MovimientosIcon,
  LockOutlined as CierreCajaIcon,
  ManageAccountsOutlined as UserIcon,
  MonitorOutlined as PedidoIcon,
  NearMeOutlined as DeliveryIcon,
  PieChartOutlined as GroupReports,
  SettingsOutlined as MaintenanceIcon,
  StorefrontOutlined as GroupStock,
  StoreMallDirectoryOutlined as SucursalIcon,
  SwapHoriz as MovimientoArticuloIcon,
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
    id: 'pedidos',
    icon: <PedidoIcon />,
    text: 'links.caja',
    roles: [''],
    path: '/',
  },
  {
    id: 'cierre-caja',
    icon: <CierreCajaIcon />,
    text: 'links.cierreDeCaja',
    roles: [''],
    path: '/cierre-caja',
  },
  {
    id: 'delivery',
    icon: <DeliveryIcon />,
    text: 'links.delivery',
    roles: [''],
    path: '/delivery',
  },
  {
    id: 'caja-agrupador',
    icon: <GroupStock sx={{ mr: 1 }} />,
    text: 'links.stock',
    roles: [''],
    path: '',
    items: [
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
      {
        id: 'stock',
        icon: <StockIcon />,
        text: 'links.articulosEnSucursal',
        roles: [''],
        path: '/stock-sucursal',
      },
      {
        id: 'movimientos-articulo-stock',
        icon: <MovimientoArticuloIcon />,
        text: 'links.articulosEnSucursalMovimientos',
        roles: [''],
        path: '/movimientos-articulos',
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
        id: 'categoria-movimientos',
        icon: <StockIcon />,
        text: 'links.categoriaMovimientos',
        roles: [''],
        path: '/categoria-movimientos',
      },
    ],
  },
  {
    id: 'tesoreria',
    icon: <GroupTesoreia sx={{ mr: 1 }} />,
    text: 'links.tesoreria',
    roles: [''],
    path: '',
    items: [
      {
        id: 'movimientos',
        icon: <MovimientosIcon />,
        text: 'links.movimientos',
        roles: [''],
        path: '/movimientos',
      },
    ],
  },
  {
    id: 'reportes',
    icon: <GroupReports sx={{ mr: 1 }} />,
    text: 'links.reportes',
    roles: [''],
    path: '',
    items: [
      {
        id: 'arqueos',
        icon: <ArqueoIcon />,
        text: 'links.arqueos',
        roles: [''],
        path: '/arqueos',
      },
      {
        id: 'estadisticas',
        icon: <EstadisticaIcon />,
        text: 'links.estadisticas',
        roles: [''],
        path: '/estadisticas',
      },
    ],
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
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ color: '#757575' }}
                >
                  {icon}
                  <Typography sx={{ fontSize: '14px', color: '#1b1b1b' }}>
                    {t(text)}
                  </Typography>
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

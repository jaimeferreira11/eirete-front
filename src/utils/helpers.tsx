import { IListItemGeneric } from '@components/ui';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CategoryIcon from '@mui/icons-material/Category';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { IFamiliaArticulo } from '../core/interfaces/familiaArticulo';

import {
  ICaja,
  ICategoriaMovimiento,
  ILineaArticulo,
  IMovimiento,
} from '@core/interfaces';
import { ISucursal } from '../core/interfaces/sucursal';
import { formateDate } from './formats';

export const parseSucursalesToItemList = (
  sucursales: ISucursal[]
): IListItemGeneric[] => {
  return sucursales.map(
    (sucursal): IListItemGeneric => ({
      _id: sucursal._id,
      title: sucursal.descripcion,
      subtitle: sucursal.direccion,
      icon: <StorefrontOutlinedIcon />,
    })
  );
};

export const parseFamiliasToItemList = (
  familias: IFamiliaArticulo[]
): IListItemGeneric[] => {
  return familias.map(
    (familia): IListItemGeneric => ({
      _id: familia._id,
      title: familia.descripcion,
      subtitle: '',
      icon: <CategoryIcon />,
    })
  );
};

export const parseCajasToItemList = (cajas: ICaja[]): IListItemGeneric[] => {
  return cajas.map(
    (caja): IListItemGeneric => ({
      _id: caja._id,
      title: `${caja.nro} - ${caja.descripcion}`,
      subtitle: caja.sucursal.descripcion,
      icon: <LocalAtmIcon />,
    })
  );
};

export const parseLineasToItemList = (
  lineas: ILineaArticulo[]
): IListItemGeneric[] => {
  return lineas.map(
    (linea): IListItemGeneric => ({
      _id: linea._id,
      title: `${linea.descripcion}`,
      subtitle: '',
      icon: <Inventory2Icon />,
    })
  );
};

export const parseCategoriaMovimientosToItemList = (
  categorias: ICategoriaMovimiento[]
): IListItemGeneric[] => {
  return categorias.map(
    (categoria): IListItemGeneric => ({
      _id: categoria._id,
      title: `${categoria.descripcion}`,
      subtitle: ` ${categoria.esGasto ? 'Egreso' : ''} ${
        categoria.esGasto && categoria.esIngreso ? '-' : ''
      } ${categoria.esIngreso ? 'Ingreso' : ''}`,
      icon: <CompareArrowsIcon />,
    })
  );
};

export const parseMovimientosToItemList = (
  categorias: IMovimiento[]
): IListItemGeneric[] => {
  return categorias.map(
    (categoria): IListItemGeneric => ({
      _id: categoria._id,
      title: `${categoria.descripcion}`,
      subtitle: `${formateDate(categoria.fechaAlta)} - Monto: Gs. ${
        categoria.monto
      }`,
      icon: categoria.esIngreso ? <CallMadeIcon /> : <CallReceivedIcon />,
      iconColor: categoria.esIngreso ? '#4bb14b' : '#da4d4d',
    })
  );
};

export const clearNumberFormat = (value: number): number => {
  if (!value) return 0;
  const num = value.toString().replace(/\D/g, '');
  return num ? Number(num) : 0;
};

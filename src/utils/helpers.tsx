import { IListItemGeneric } from '@components/ui';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { IFamiliaArticulo } from '../core/interfaces/familiaArticulo';

import { ICaja, ILineaArticulo } from '@core/interfaces';
import { ISucursal } from '../core/interfaces/sucursal';

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
      subtitle: linea.familia.descripcion,
      icon: <Inventory2Icon />,
    })
  );
};

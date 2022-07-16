import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { IListItemGeneric } from '@components/ui';
import { ICaja } from '@core/interfaces';
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

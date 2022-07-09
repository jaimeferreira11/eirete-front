import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { IListItemGeneric } from '@components/ui';
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

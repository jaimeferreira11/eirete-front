import { IListItemGeneric } from '@components/ui';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { IFamiliaArticulo } from '../core/interfaces/familiaArticulo';
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
      subtitle: "",
      icon: <CategoryIcon />,
    })
  );
};

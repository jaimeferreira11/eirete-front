import { IStockArticuloSucursal } from './stock';

export interface IArticuloSucursal {
  _id: string;
  sucursal: Sucursal;
  articulos: IStockArticuloSucursal[];
}

export interface Sucursal {
  _id: string;
}

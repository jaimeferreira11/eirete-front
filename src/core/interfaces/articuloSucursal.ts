import { IArticuloStock } from './articuloStock';

export interface IArticuloSucursal {
  _id: string;
  sucursal: Sucursal;
  articulos: IArticuloStock[];
}

export interface Sucursal {
  _id: string;
}

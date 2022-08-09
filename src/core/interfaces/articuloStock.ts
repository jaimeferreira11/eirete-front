import { IArticulo } from './articulos';

export interface IArticuloStock {
  _id: string;
  articulo: IArticulo;
  stock: number;
  stockMinimo: number;
  estado: boolean;
}

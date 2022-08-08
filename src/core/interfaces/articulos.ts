// Generated by https://quicktype.io

import { TipoImpuesto } from './tipoImpuesto';
import { UnidadMedida } from './unidadMedida';

export interface IArticulo {
  _id: string;
  unidadMedida: UnidadMedida;
  estado: boolean;
  tipoImpuesto: TipoImpuesto;
  descripcion: string;
  precioVenta: number;
  lineaArticulo: LineaArticulo;
  codigoBarra: string;
  codigo: number;
}

export interface LineaArticulo {
  _id: string;
}

// Generated by https://quicktype.io

import { TipoImpuesto, UnidadMedida } from '@core/interfaces';

export interface INewArticulo {
  descripcion: string;
  precioVenta: number;
  unidadMedida: UnidadMedida;
  lineaArticulo: string;
  tipoImpuesto: TipoImpuesto;
  codigoBarra: string;
  codigo: number;
  estado: boolean;
}
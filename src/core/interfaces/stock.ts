// Generated by https://quicktype.io

export interface IStockArticuloSucursal {
  stockBloqueado: number;
  stock: number;
  stockMinimo: number;
  estado: boolean;
  _id: string;
  articulo: IArticuloStock;
  usuarioAlta: string;
  fechaAlta: string;
}

export interface IArticuloStock {
  _id: string;
  unidadMedida: string;
  estado: boolean;
  tipoImpuesto: number;
  descripcion: string;
  precioVenta: number;
  lineaArticulo: ILineaArticuloStock;
  codigoBarra: string;
  codigo: number;
  fechaAlta: string;
  usuarioAlta: string;
  __v: number;
  fechaModif?: string;
  usuarioModif?: string;
}

export interface ILineaArticuloStock {
  _id: string;
  estado: boolean;
  descripcion: string;
}

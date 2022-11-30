// Generated by https://quicktype.io

export interface IArticuloMovimiento {
  _id: string;
  numero: number;
  codigo: string;
  sucursalDestino: Sucursal;
  sucursalOrigen: Sucursal;
  detalles: IArticuloMovimientoDetalle[];
  usuarioAlta: Usuario;
  fechaAlta: string;
  __v: number;
  estado: string;
  fechaModif: string;
  usuarioModif: Usuario;
}

export interface IArticuloMovimientoDetalle {
  articulo: IArticuloMovimientoItem;
  enviado: number;
  recibido: number;
  _id: string;
}

export interface IArticuloMovimientoItem {
  _id: string;
  unidadMedida: string;
  estado: boolean;
  tipoImpuesto: number;
  descripcion: string;
  precioVenta: number;
  lineaArticulo: LineaArticulo;
  codigoBarra: string;
  codigo: number;
  fechaAlta: string;
  usuarioAlta: string;
  fechaModif?: string;
  usuarioModif?: string;
}

interface LineaArticulo {
  _id: string;
  estado: boolean;
  descripcion: string;
}

interface Sucursal {
  _id: string;
  descripcion: string;
}

interface Usuario {
  _id: string;
  username: string;
}

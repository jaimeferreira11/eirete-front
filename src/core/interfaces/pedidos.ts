// Generated by https://quicktype.io

export interface IPedidoResponse {
  _id: string;
  nro: number;
  cliente: IPedidoCliente;
  sucursal: IPedidoSucursal;
  impuesto: number;
  estadoPedido: string;
  tipoFactura: string;
  tipoPedido: string;
  detalles: IPedidoDetalle[];
  metodosPago: MetodosPago[];
  importeTotal: number;
  montoRecibido: number;
  vuelto: number;
  usuarioAlta: IPedidoUsuarioAlta;
  estadoDelivery: string;
  motivoCancelacion: string;
  fecha: string;
  fechaAlta: string;
  __v: number;
}

export interface IPedidoCliente {
  _id: string;
  persona: IPedidoPersona;
  estado: boolean;
  usuarioAlta: string;
  fechaAlta: string;
  fechaModif: string;
  usuarioModif: string;
  direcciones: string[];
}

export interface IPedidoPersona {
  _id: string;
  nroDoc: string;
  nombreApellido: string;
  tipoDoc: string;
  sexo: string;
  tipoPersona: string;
  ruc: string;
  usuarioAlta: string;
  fechaAlta: Date;
  fechaModif: Date;
  usuarioModif: string;
}

export interface IPedidoDetalle {
  articulo: IPedidoArticulo;
  cantidad: number;
  precioUnitario: number;
  tipoImpuesto: number;
  impuesto: number;
  subtotal: number;
  _id: string;
}

export interface IPedidoArticulo {
  _id: string;
  descripcion: string;
  codigoBarra: string;
  codigo: number;
  unidadMedida: string;
  precioVenta: number;
  lineaArticulo: IPedidoLineaArticulo;
  estado: boolean;
  tipoImpuesto: number;
  fechaAlta: string;
  usuarioAlta: string;
  fechaModif: string;
  usuarioModif: string;
}

export interface IPedidoLineaArticulo {
  _id: string;
  estado: boolean;
  descripcion: string;
}

export interface MetodosPago {
  importe: number;
  descripcion: string;
  referencia: string;
  _id: string;
}

export interface IPedidoSucursal {
  _id: string;
  descripcion: string;
}

export interface IPedidoUsuarioAlta {
  _id: string;
  username: string;
}

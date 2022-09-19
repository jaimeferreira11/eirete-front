// Generated by https://quicktype.io

export interface IArqueo {
  totalEgreso: number;
  movimientos: any[];
  pedidosRealizados: any[];
  pedidosCancelados: any[];
  _id: string;
  turno: IArqueoTurno;
  sucursal: IArqueoSucursal;
  monedas: IArqueoBillete[];
  billetes: IArqueoBillete[];
  IArqueobilletes: IArqueoBillete[];
  totalEfectivo: number;
  totalDeposito: number;
  responsable: string;
  estado: boolean;
  usuarioAlta: IArqueoUsuarioAlta;
  usuarioModif?: IArqueoUsuarioAlta;
  stock: any[];
  fechaAlta: string;
  __v: number;
}

export interface IArqueoBillete {
  cantidad: number;
  descripcion: string;
  _id: string;
}

export interface IArqueoSucursal {
  _id: string;
  descripcion: string;
}

export interface IArqueoTurno {
  _id: string;
  nro: number;
  fechaCierre: string;
  sucursal: string;
  estado: boolean;
  usuarioAlta: string;
  fechaApertura: string;
  fechaAlta: string;
  fechaModif: string;
  usuarioModif: string;
}

export interface IArqueoUsuarioAlta {
  _id: string;
  username: string;
}

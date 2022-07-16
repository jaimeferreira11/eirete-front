export interface ICaja {
  _id: string;
  descripcion: string;
  nro: number;
  estado: boolean;
  sucursal: {
    _id: string;
    descripcion: string;
  };
}

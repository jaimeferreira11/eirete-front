export interface INewSucursal {
  descripcion: string;
  direccion: string;
  ciudad: string;
  timbrado?: number;
  establecimiento?: number;
  puntoExpedicion: number;
  rangoInicial: number;
  rangoFinal: number;
  estado: boolean;
}

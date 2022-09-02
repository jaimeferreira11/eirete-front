import { IPerfil } from '.';

export interface IUser {
  _id: string;
  nombreApellido?: string;
  username: string;
  estado: string;
  token: string;
  rol: IUserRol;
  perfiles: IPerfil[];
  correo?: string;
  celular?: string;
  sucursal: string;
  turno: string;
}

export type IUserRol = 'ROOT_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE';

export interface ITurno {
  _id: string;
  nro: number;
  fechaCierre: Date;
  sucursal: string;
  estado: boolean;
  usuarioAlta: string;
  fechaApertura: Date;
  fechaAlta: Date;
}

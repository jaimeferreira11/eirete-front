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
  sucursal: {
    _id: string;
    descripcion: string;
  };
}

export type IUserRol = 'ROOT_ROLE' | 'ADMIN_ROLE' | 'USER_ROLE';

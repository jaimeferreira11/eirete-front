import { IPerfil, IUser } from '.';

export interface IAuthUser {
  usuario: IUser;
  token: string;
  perfilActual: IPerfil;
}

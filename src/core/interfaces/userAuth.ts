import { IPerfil, ITurno, IUser } from '.';

export interface IAuthUser {
  usuario: IUser;
  token: string;
  perfilActual: IPerfil;
  turno: ITurno;
}

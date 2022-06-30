import { IUser } from '../user';

export interface ListUserResponse {
  total: number;
  data: IUser[];
}

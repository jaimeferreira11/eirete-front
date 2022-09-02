import { EireteApi } from '..';
import { IAuthUser } from '../interfaces';

interface CredentialsProps {
  username: string;
  password: string;
}

export const userLogin = async ({ username, password }: CredentialsProps) => {
  try {
    const { data } = await EireteApi.post<IAuthUser>('/auth/login', {
      username,
      password,
    });

    if (data)
      return {
        ...data.usuario,
        turno: data.turno._id,
        token: data.token,
      };

    return null;
  } catch (error) {
    return null;
  }
};

import { EireteApi } from '..';

interface IUserAuth {
  username: string;
  password: string;
}

export const userLogin = async ({ username, password }: IUserAuth) => {
  try {
    const { data } = await EireteApi.post('/auth/login', {
      username,
      password,
    });

    if (data)
      return {
        username,
        nombreApellido: data.usuario?.nombreApellido,
        _id: data.usuario?.uid,
        estado: data.usuario?.estado,
      };

    return null;
  } catch (error) {
    return null;
  }
};

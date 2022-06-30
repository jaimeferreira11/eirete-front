import eireteApi from '@core/api';

export const saveUser = async (newUser: any) => {
  try {
    await eireteApi.post('/usuarios', newUser);
  } catch (error) {
    console.log(error);
  }
};

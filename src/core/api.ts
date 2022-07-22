import axios, { AxiosError } from 'axios';

const eireteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EIRETE,
});

eireteApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    if (err.response.data.errors && Array.isArray(err.response.data.errors))
      throw new AxiosError(
        err.response.data.errors
          .map((e: any) => `${e.param}: ${e.msg}. `)
          .join(' - ')
      );

    throw new AxiosError(err.response.data.msg);
  }
);
export default eireteApi;

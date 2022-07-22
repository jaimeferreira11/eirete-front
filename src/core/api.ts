import axios, { AxiosError } from 'axios';

const eireteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EIRETE,
});

eireteApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.errors && Array.isArray(err.response.data.errors))
      throw new AxiosError(err.response.data.errors[0].msg);

    throw new AxiosError(err.response.data.message);
  }
);
export default eireteApi;

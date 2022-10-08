import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { NextResponse } from 'next/server';

const eireteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EIRETE,
});

eireteApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // TODO: Revisar si esta bien, cuando vence el token del back debe desloguear el front
      signOut();
      const loginUrl = new URL('/auth/login');
      return NextResponse.redirect(loginUrl);
    }
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

import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';

import { SWRConfig } from 'swr';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@lib/context/Utils';
import eireteApi from 'src/core/api';
import { AuthProvider } from '../lib/context/Auth';
import '../styles/globals.css';
import { lightTheme } from '../themes';

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (url) => eireteApi.get(url).then((res) => res.data),
        }}
      >
        <AuthProvider>
          <ThemeProvider theme={lightTheme}>
            <SnackbarProvider>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

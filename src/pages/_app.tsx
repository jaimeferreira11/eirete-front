import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';

import { CssBaseline, ThemeProvider } from '@mui/material';

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
      <AuthProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

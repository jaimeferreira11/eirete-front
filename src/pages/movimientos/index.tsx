import { ReactElement } from 'react';

import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { MovimientosDataGrid } from '@components/movimientos';
import { FullScreenLoading } from '@components/ui';
import { MovimientosProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';

const MovimientosPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <MovimientosDataGrid />;
};

MovimientosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MovimientosProvider>
      <AppLayout
        title="Eirete - Movimientos"
        pageDescription="Registro de movimientos"
      >
        {page}
      </AppLayout>
    </MovimientosProvider>
  );
};

export default MovimientosPage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'movimientosABM',
        'listGeneric',
      ])),
    },
  };
};

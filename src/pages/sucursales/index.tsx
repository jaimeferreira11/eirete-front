import { ReactElement } from 'react';

import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { SucursalesDataGrid } from '@components/sucursales';
import { FullScreenLoading } from '@components/ui';
import { SucursalesProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';

const SucursalesPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <SucursalesDataGrid />;
};

SucursalesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SucursalesProvider>
      <AppLayout
        title="Eirete - Sucursales"
        pageDescription="ABM de sucursales"
      >
        {page}
      </AppLayout>
    </SucursalesProvider>
  );
};

export default SucursalesPage;

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
        'sucursalesABM',
        'listGeneric',
      ])),
    },
  };
};

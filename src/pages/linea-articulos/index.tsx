import { AppLayout } from '@components/layouts';
import { LineasDataGrid } from '@components/linea-articulos';
import { FullScreenLoading } from '@components/ui';
import { LineasProvider } from '@lib/context/LineaArticulos';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const LineaArticuloPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <LineasDataGrid />;
};

LineaArticuloPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LineasProvider>
      <AppLayout
        title="Eirete - Línea de articulos"
        pageDescription="ABM de línea de artículos"
      >
        {page}
      </AppLayout>
    </LineasProvider>
  );
};

export default LineaArticuloPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'lineaArticulosABM',
        'listGeneric',
      ])),
    },
  };
};

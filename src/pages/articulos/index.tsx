import { ArticulosDataGrid } from '@components/articulos';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { ArticulosProvider } from '@lib/context/Articulos';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const ArticulosPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <ArticulosDataGrid />;
};

ArticulosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ArticulosProvider>
      <AppLayout
        title="Eirete - Articulos"
        pageDescription="ABM de línea artículos"
      >
        {page}
      </AppLayout>
    </ArticulosProvider>
  );
};

export default ArticulosPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'articulosABM',
        'listGeneric',
      ])),
    },
  };
};

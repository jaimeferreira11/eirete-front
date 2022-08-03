import { FamiliasDataGrid } from '@components/familia-articulos';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { FamiliasProvider } from '@lib/context/FamiliaArticulos';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const FamiliaArticuloPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <FamiliasDataGrid />;
};

FamiliaArticuloPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamiliasProvider>
      <AppLayout
        title="Eirete - Familia"
        pageDescription="ABM de familia de artículos"
      >
        {page}
      </AppLayout>
    </FamiliasProvider>
  );
};

export default FamiliaArticuloPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'familiaArticulosABM',
        'listGeneric',
      ])),
    },
  };
};

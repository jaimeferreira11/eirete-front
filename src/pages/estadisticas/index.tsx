import { EstadisticasGrid } from '@components/estadisticas/EstadisticasGrid';
import { AppLayout } from '@components/layouts';

import { FullScreenLoading } from '@components/ui';
import { EstadisticasProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const EstadisticasPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <EstadisticasGrid />;
};

EstadisticasPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <EstadisticasProvider>
      <AppLayout title="Eirete - Pedidos" pageDescription="Pedidos">
        {page}
      </AppLayout>
    </EstadisticasProvider>
  );
};

export default EstadisticasPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'pedidos',
        'estadisticas',
        'listGeneric',
      ])),
    },
  };
};

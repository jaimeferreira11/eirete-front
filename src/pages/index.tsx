import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { PedidosGrid } from '@components/pedidos';
import { FullScreenLoading } from '@components/ui';
import { PedidosProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  const { isLoggedIn, user } = useAuthProvider();

  console.log('user', user);
  return !isLoggedIn ? <FullScreenLoading /> : <PedidosGrid />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PedidosProvider>
      <AppLayout title="Eirete - Home Page" pageDescription="Página">
        {page}
      </AppLayout>
    </PedidosProvider>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'pedidos',
      ])),
    },
  };
};

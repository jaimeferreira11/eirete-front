import { AppLayout } from '@components/layouts';
import { PedidosGrid } from '@components/pedidos';

import { FullScreenLoading } from '@components/ui';
import { PedidosProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const PedidosPage: NextPageWithLayout = () => {
  const { isLoggedIn, user } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <PedidosGrid />;
};

PedidosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PedidosProvider>
      <AppLayout title="Eirete - Pedidos" pageDescription="Pedidos">
        {page}
      </AppLayout>
    </PedidosProvider>
  );
};

export default PedidosPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'pedidos',
        'listGeneric',
      ])),
    },
  };
};

import { ArqueosGrid } from '@components/arqueos';
import { AppLayout } from '@components/layouts';

import { FullScreenLoading } from '@components/ui';
import { ArqueoProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const ArqueosPage: NextPageWithLayout = () => {
  const { isLoggedIn, user } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <ArqueosGrid />;
};

ArqueosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ArqueoProvider>
      <AppLayout title="Eirete - Pedidos" pageDescription="Pedidos">
        {page}
      </AppLayout>
    </ArqueoProvider>
  );
};

export default ArqueosPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'arqueos',
        'listGeneric',
      ])),
    },
  };
};

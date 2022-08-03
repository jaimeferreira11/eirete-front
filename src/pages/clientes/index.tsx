import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ClienteDataGrid } from '@components/clientes';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { ClienteProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';

const SucursalesPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <ClienteDataGrid />;
};

SucursalesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClienteProvider>
      <AppLayout title="Eirete - Clientes" pageDescription="ABM de clientes">
        {page}
      </AppLayout>
    </ClienteProvider>
  );
};

export default SucursalesPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'clientesABM',
        'listGeneric',
      ])),
    },
  };
};

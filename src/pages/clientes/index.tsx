import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const session = await getSession({ req });

  const p = req.url;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=${p}`,
        permanent: false,
      },
    };
  }

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

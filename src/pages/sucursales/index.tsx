import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

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
        'sucursalesABM',
        'listGeneric',
      ])),
    },
  };
};

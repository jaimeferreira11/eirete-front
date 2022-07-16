import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CajasDataGrid } from '@components/cajas';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { CajasProvider } from '@lib/context/Cajas';
import { useAuthProvider } from '@lib/hooks';

const CajasPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <CajasDataGrid />;
};

CajasPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CajasProvider>
      <AppLayout title="Eirete - Cajas" pageDescription="ABM de cajas">
        {page}
      </AppLayout>
    </CajasProvider>
  );
};

export default CajasPage;

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
        'cajasABM',
        'listGeneric',
      ])),
    },
  };
};

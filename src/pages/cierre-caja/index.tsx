import { CierreCajaGrid } from '@components/cierreCaja';
import { AppLayout } from '@components/layouts';

import { FullScreenLoading } from '@components/ui';
import { CierreCajaProvider } from '@lib/context/CierreCaja';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const CierraCajaPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <CierreCajaGrid />;
};

CierraCajaPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CierreCajaProvider>
      <AppLayout title="Eirete - Cierre caja" pageDescription="Pedidos">
        {page}
      </AppLayout>
    </CierreCajaProvider>
  );
};

export default CierraCajaPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'cierreCaja',
        'listGeneric',
      ])),
    },
  };
};

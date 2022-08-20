import { AppLayout } from '@components/layouts';
import { StockSucursalDataGrid } from '@components/stock-sucursal';
import { FullScreenLoading } from '@components/ui';
import { StockSucursalProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const StockSucursalPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <StockSucursalDataGrid />;
};

StockSucursalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StockSucursalProvider>
      <AppLayout title="Eirete - Stock" pageDescription="Stock en sucursal">
        {page}
      </AppLayout>
    </StockSucursalProvider>
  );
};

export default StockSucursalPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'stockSucursalABM',
        'listGeneric',
      ])),
    },
  };
};

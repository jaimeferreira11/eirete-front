import { ReactElement } from 'react';

import { GetStaticProps } from 'next';

import { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CategoriaMovimientosDataGrid } from '@components/categoriaMovimientos';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { CategoriaMovimientosProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';

const CategoriaMovimientosPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <CategoriaMovimientosDataGrid />;
};

CategoriaMovimientosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CategoriaMovimientosProvider>
      <AppLayout
        title="Eirete - Categoría movimiento"
        pageDescription="ABM de Categoría de movimientos"
      >
        {page}
      </AppLayout>
    </CategoriaMovimientosProvider>
  );
};

export default CategoriaMovimientosPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'categoriaMovimientosABM',
        'listGeneric',
      ])),
    },
  };
};

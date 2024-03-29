import { AppLayout } from '@components/layouts';
import { MovimientosArticulosSucursal } from '@components/movimientosArticulos';
import { FullScreenLoading } from '@components/ui';
import { EnviosProvider } from '@lib/context/Envios';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const MovimientosArticulosSucursalPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <MovimientosArticulosSucursal />;
};

MovimientosArticulosSucursalPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <EnviosProvider>
      <AppLayout
        title="Eirete - Movimientos artículos"
        pageDescription="Movimientos de articulos"
      >
        {page}
      </AppLayout>
    </EnviosProvider>
  );
};

export default MovimientosArticulosSucursalPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'movimientosArticulos',
        'listGeneric',
      ])),
    },
  };
};

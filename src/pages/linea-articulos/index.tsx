import { AppLayout } from '@components/layouts';
import { LineasDataGrid } from '@components/linea-articulos';
import { FullScreenLoading } from '@components/ui';
import { LineasProvider } from '@lib/context/LineaArticulos';
import { useAuthProvider } from '@lib/hooks';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const LineaArticuloPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <LineasDataGrid />;
};

LineaArticuloPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LineasProvider>
      <AppLayout
        title="Eirete - Línea de articulos"
        pageDescription="ABM de línea de artículos"
      >
        {page}
      </AppLayout>
    </LineasProvider>
  );
};

export default LineaArticuloPage;

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
        'lineaArticulosABM',
        'listGeneric',
      ])),
    },
  };
};

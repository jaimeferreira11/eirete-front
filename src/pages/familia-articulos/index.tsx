import { AppLayout } from '@components/layouts';
import { SucursalesDataGrid } from '@components/sucursales';
import { FullScreenLoading } from '@components/ui';
import { SucursalesProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';





const FamiliaArticuloPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <SucursalesDataGrid />;
};

FamiliaArticuloPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SucursalesProvider>
      <AppLayout
        title="Eirete - Familia"
        pageDescription="ABM de familia de artículos"
      >
        {page}
      </AppLayout>
    </SucursalesProvider>
  );
};

export default FamiliaArticuloPage;

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
        'familiaArticulosABM',
        'listGeneric',
      ])),
    },
  };
};

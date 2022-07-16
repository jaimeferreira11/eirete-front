import { FamiliasDataGrid } from '@components/familia-articulos';
import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { FamiliasProvider } from '@lib/context/FamiliaArticulos';
import { useAuthProvider } from '@lib/hooks';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const FamiliaArticuloPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <FamiliasDataGrid />;
};

FamiliaArticuloPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <FamiliasProvider>
      <AppLayout
        title="Eirete - Familia"
        pageDescription="ABM de familia de artículos"
      >
        {page}
      </AppLayout>
    </FamiliasProvider>
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

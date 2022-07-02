import { ReactElement } from 'react';

import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return <div></div>;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout title="Eirete - Home Page" pageDescription="Página">
      {page}
    </AppLayout>
  );
};

export default HomePage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const session = await getSession({ req });

  console.log('req.url', req.url);
  const { p = '/' } = query;

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
      ...(await serverSideTranslations(locale || 'es', ['common', 'sidebar'])),
    },
  };
};

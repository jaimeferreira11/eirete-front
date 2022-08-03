import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { GetStaticProps } from 'next';
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common', 'sidebar'])),
    },
  };
};

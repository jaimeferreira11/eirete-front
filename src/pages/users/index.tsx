import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { FullScreenLoading } from '@components/ui';
import { UsersDataGrid } from '@components/users';
import { UserProvider } from '@lib/context';
import { useAuthProvider } from '@lib/hooks';
import { GetStaticProps } from 'next';
import { NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthProvider();

  return !isLoggedIn ? <FullScreenLoading /> : <UsersDataGrid />;
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserProvider>
      <AppLayout title="Eirete - Home Page" pageDescription="Página">
        {page}
      </AppLayout>
    </UserProvider>
  );
};

export default UsersPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'usersABM',
      ])),
    },
  };
};

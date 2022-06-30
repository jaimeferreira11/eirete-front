import { ReactElement } from 'react';

import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@components/layouts';
import { UsersDataGrid } from '@components/users';
import { UserProvider } from '@lib/context';
import { NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => {
  return <UsersDataGrid />;
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const session = await getSession({ req });

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
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'usersABM',
      ])),
    },
  };
};

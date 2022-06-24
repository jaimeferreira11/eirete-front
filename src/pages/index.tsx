import { Typography } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppLayout } from '../components/layouts';

const HomePage: NextPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'homePage' });
  return (
    <AppLayout title="Eirete - Home Page" pageDescription="Página">
      <Typography variant="h1">{t('test')}</Typography>
    </AppLayout>
  );
};

export default HomePage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common', 'sidebar'])),
    },
  };
};

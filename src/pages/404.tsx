import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextLink from 'next/link';
import { NextPageWithLayout } from './_app';

const NotFoundPage: NextPageWithLayout = () => {
  const { t } = useTranslation('notFoundPage');

  return (
    <Container
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        py: 9,
        borderRadius: 5,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', sm: 'row' }, mb: 3 }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontSize={60}
            fontWeight={150}
            color="primary"
          >
            404 |
          </Typography>
          <Typography marginLeft={2} fontWeight={300}>
            {t('notFoundText')}
          </Typography>
        </Box>

        <NextLink href="/" passHref>
          <Link>
            <Button disableElevation endIcon={<HomeOutlinedIcon />}>
              {t('homeLink')}
            </Button>
          </Link>
        </NextLink>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['notFoundPage'])),
    },
  };
};

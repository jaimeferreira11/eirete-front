import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { Logo } from '../../components/ui';
import { NextPageWithLayout } from '../_app';

type FormData = {
  username: string;
  password: string;
};

const LoginPage: NextPageWithLayout = () => {
  const { t: tLogin } = useTranslation('login');
  const { t: tForm } = useTranslation('common', { keyPrefix: 'forms' });

  const [isLogging, setIsLogging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ username, password }: FormData) => {
    try {
      setIsLogging(true);
      await signIn('credentials', { username, password });
      setIsLogging(false);
    } catch (error) {
      setIsLogging(false);
      console.log('error', error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: '#fff',
        width: 776,
        height: 328,
        py: 9,
        borderRadius: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={5} item sx={{ px: 3 }}>
            <Box sx={{ borderRight: '1px solid', borderColor: '#EAEAEA' }}>
              <Logo />
            </Box>
          </Grid>
          <Grid spacing={2} container xs={7} item sx={{ px: 5 }}>
            <Grid xs={12} item>
              <TextField
                label={tLogin('username')}
                fullWidth
                {...register('username', {
                  required: tForm('required'),
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type="password"
                label={tLogin('password')}
                fullWidth
                {...register('password', {
                  required: tForm('required'),
                  minLength: {
                    value: 6,
                    message: tForm('minLengthField', { cantidad: 6 }),
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid xs={12} item>
              <Button
                disabled={isLogging}
                type="submit"
                sx={{ py: 1 }}
                fullWidth
              >
                {isLogging ? (
                  <CircularProgress size="25px" color="info" />
                ) : (
                  <Typography> Iniciar Sesión</Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout title="Acceso">{page}</AuthLayout>;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', [
        'common',
        'sidebar',
        'login',
      ])),
    },
  };
};

import { SnackBarEirete } from '@components/ui';
import { Box } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main style={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
        <SnackBarEirete />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};

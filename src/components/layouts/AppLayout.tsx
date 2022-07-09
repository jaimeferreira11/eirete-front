import { SnackBarEirete } from '@components/ui/Snackbar';
import { Box } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import { SideBar } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  children?: React.ReactNode;
}

export const AppLayout: FC<Props> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>

      <main style={{ height: '100vh' }}>
        <Box
          display="flex"
          gap={3}
          sx={{ backgroundColor: '#E5E5E5', px: 4, py: 4, height: '100%' }}
        >
          <SideBar />
          <SnackBarEirete />
          <Box
            flex={1}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </main>
    </>
  );
};

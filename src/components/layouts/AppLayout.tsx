import { Box, Grid } from '@mui/material';
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

      <main
        style={{
          backgroundColor: '#E5E5E5',
          height: '100vh',
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={1} sm={2} sx={{ height: '100px' }}>
            <SideBar />
          </Grid>
          <Grid item xs={11} sm={10} sx={{ px: 3, py: 2 }}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                height: '100%',
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <footer>{/* TODO CustomFooter */}</footer>
    </>
  );
};

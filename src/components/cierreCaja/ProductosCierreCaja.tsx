import { FullScreenLoading } from '@components/ui';
import { useAuthProvider, useStockPorSucursal } from '@lib/hooks';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export const ProductosCierreCaja = () => {
  const { user } = useAuthProvider();

  const { articulosSucursal, isLoading } = useStockPorSucursal(user?.sucursal);

  const articulosExistentes = useMemo(() => {
    if (isLoading) return [];
    if (articulosSucursal && articulosSucursal[0])
      return articulosSucursal[0].articulos;

    return [];
  }, [articulosSucursal, isLoading]);

  const { t } = useTranslation('cierreCaja');
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={4}
      sx={{
        height: '100%',
        borderRight: '0.1em solid #EAEAEA',
      }}
    >
      <Typography variant="h1">{t('productos')}</Typography>

      <Box flex={1} sx={{ overflow: 'auto' }}>
        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <Grid container sx={{ mt: 2 }}>
            {articulosExistentes.map((articulo) => (
              <Grid key={articulo._id} item xs={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ p: 1.5 }}
                >
                  <Typography
                    variant="body2"
                    style={{ width: '100%' }}
                    fontWeight={500}
                  >
                    {articulo.articulo.descripcion}
                  </Typography>
                  <Box
                    sx={{
                      border: '0.1em solid #aaa7a7',
                      color: '#aaa7a7',
                      p: 1,
                      width: '80px',
                      maxWidth: '90px',
                      textAlign: 'center',
                      borderRadius: 3,
                    }}
                  >
                    <Typography>{articulo.stock}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

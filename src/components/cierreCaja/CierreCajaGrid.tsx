import { Grid } from '@mui/material';
import { CierreCajaDetalle } from './CierreCajaDetalle';
import { ProductosCierreCaja } from './ProductosCierreCaja';

export const CierreCajaGrid = () => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={12} md={6}>
        <ProductosCierreCaja />
      </Grid>
      <Grid item xs={12} md={6}>
        <CierreCajaDetalle />
      </Grid>
    </Grid>
  );
};

import GrainIcon from '@mui/icons-material/Grain';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const Logo = () => {
  const { t } = useTranslation('sidebar');
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{ width: 'auto', textAlign: 'center', pb: 2 }}
    >
      <GrainIcon color="primary" sx={{ fontSize: { xs: 38, sm: 75 } }} />
      <Typography
        sx={{ display: { xs: 'none', sm: 'block' } }}
        variant="body1"
        component="h5"
        fontWeight={800}
      >
        {t('logo.texto1')}
      </Typography>
      <Typography
        sx={{ display: { xs: 'none', sm: 'block' } }}
        variant="body2"
        fontWeight={400}
      >
        {t('logo.texto2')}
      </Typography>
    </Box>
  );
};

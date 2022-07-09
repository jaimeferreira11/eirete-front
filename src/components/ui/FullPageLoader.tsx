import { Box, CircularProgress } from '@mui/material';

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress thickness={2} />
    </Box>
  );
};

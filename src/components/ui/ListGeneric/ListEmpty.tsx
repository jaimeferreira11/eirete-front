import { FC } from 'react';

import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import { Box, Typography } from '@mui/material';

interface Props {
  description: string;
  children?: React.ReactNode;
}

export const ListEmpty: FC<Props> = ({ description }) => {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box flex={1} />
      <Box flex={2} display="flex" flexDirection="column" alignItems="center">
        <ContentPasteOffOutlinedIcon sx={{ fontSize: 100, color: '#EAEAEA' }} />
        <Typography
          variant="h5"
          component={'div'}
          sx={{ textAlign: 'center', width: 300, color: '#CBCBCB' }}
        >
          {description}
        </Typography>
      </Box>
      <Box flex={1} />
    </Box>
  );
};

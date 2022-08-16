import { Box } from '@mui/material';
import { FC } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export const GenericTab: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        display: value === index ? 'flex' : 'none',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {value === index && (
        <Box sx={{ display: 'flex', flex: '100%' }}>{children}</Box>
      )}
    </Box>
    // <div
    //   role="tabpanel"
    //   hidden={value !== index}
    //   id={`simple-tabpanel-${index}`}
    //   aria-labelledby={`simple-tab-${index}`}
    //   {...other}
    // >

    // </div>
  );
};

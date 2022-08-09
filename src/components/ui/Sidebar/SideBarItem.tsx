import { FC } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useUtilsProvider } from '@lib/hooks';
import {
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

interface Props {
  path: string;
  text: string;
  icon: React.ReactNode;
}

export const SideBarItem: FC<Props> = ({ path, text, icon }) => {
  const { asPath } = useRouter();
  const { t } = useTranslation('sidebar');
  const { closeDrawer } = useUtilsProvider();

  return (
    <NextLink href={path} passHref>
      <Link sx={{ color: asPath === path ? 'primary' : '#000' }}>
        <ListItemButton
          sx={{
            mb: 1,
          }}
          selected={asPath === path ? true : false}
          onClick={closeDrawer}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'start',
              color: asPath !== path ? 'primary' : '#fff',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            sx={{
              overflow: 'clip',
              fontWeight: asPath !== path ? 300 : 800,
            }}
            primary={
              <Typography sx={{ fontSize: '14px' }}>
                {t(text) as any}
              </Typography>
            }
          />
        </ListItemButton>
      </Link>
    </NextLink>
  );
};

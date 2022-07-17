import React, { FC, useState } from 'react';

import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface Props {
  searchHandler: (query: string, activate: string) => void;
  isLoading: boolean;
  children?: React.ReactNode;
}

export const FilterBox: FC<Props> = ({ searchHandler, isLoading }) => {
  const { t } = useTranslation('common');

  const [activeValue, setActiveValue] = useState('true');
  const [searchQuery, setSearchQuery] = useState('');

  const onFilter = () => {
    searchHandler(searchQuery, activeValue);
  };

  return (
    <Grid container sx={{ width: '100%' }} spacing={2}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          size="small"
          label={t('searchForm.search')}
          sx={{ mb: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid>

      <Grid item xs={2}>
        <TextField
          size="small"
          select
          label={t('searchForm.estado')}
          fullWidth
          value={activeValue}
          onChange={(e) => setActiveValue(e.target.value)}
        >
          <MenuItem key={'activos'} value={'true'}>
            {t('searchForm.activos')}
          </MenuItem>
          <MenuItem key={'inactivos'} value={'false'}>
            {t('searchForm.inactivos')}
          </MenuItem>
          <MenuItem key={'all'} value={'all'}>
            {t('searchForm.all')}
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <Button disabled={isLoading} onClick={onFilter}>
          {t('searchForm.fitrar')}
        </Button>
      </Grid>
    </Grid>
  );
};

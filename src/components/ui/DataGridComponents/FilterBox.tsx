import React, { FC, useCallback, useState } from 'react';

import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface Props {
  searchHandler: (
    query: string,
    activate: string,
    optionValue?: string
  ) => void;
  isLoading: boolean;
  children?: React.ReactNode;
  showActive: boolean;
  optionsDropDown?:
    | {
        options: { value: any; description: string }[];
        label: string;
        initialValue: string;
      }
    | undefined;
}

export const FilterBox: FC<Props> = ({
  searchHandler,
  isLoading,
  showActive,
  optionsDropDown,
}) => {
  const { t } = useTranslation('common');

  const [activeValue, setActiveValue] = useState('true');
  const [optionValue, setOptionValue] = useState(
    optionsDropDown?.initialValue || ''
  );
  const [searchQuery, setSearchQuery] = useState('');

  const onFilter = useCallback(() => {
    searchHandler(searchQuery, activeValue, optionValue);
  }, [activeValue, optionValue, searchHandler, searchQuery]);

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

      {showActive && (
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
      )}
      {optionsDropDown && (
        <Grid item xs={2}>
          <TextField
            size="small"
            select
            label={optionsDropDown?.label}
            fullWidth
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
          >
            {optionsDropDown.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.description}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}

      <Grid item xs={2}>
        <Button disabled={isLoading} onClick={onFilter}>
          {t('searchForm.fitrar')}
        </Button>
      </Grid>
    </Grid>
  );
};

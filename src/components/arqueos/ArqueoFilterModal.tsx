import { useArqueoProvider } from '@lib/hooks';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {
  Box,
  Button,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import localeSpanish from 'dayjs/locale/es-mx';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const FILTERS_VALUES = {
  today: 'today',
  week: 'week',
  month: 'month',
  year: 'year',
};

export const ArqueoFilterModal = () => {
  const { t } = useTranslation('arqueos', { keyPrefix: 'filterFecha' });

  const [staticFilterValue, setStaticFilterValue] = useState('');

  const {
    updateRangeData,
    setRangeDateToday,
    setRangeDateWeek,
    setRangeDateMonth,
    setRangeDateYear,
  } = useArqueoProvider();

  const [fechaDesdeFilter, setFechaDesdeFilter] = useState<Dayjs | null>(
    dayjs()
  );
  const [fechaHastaFilter, setFechaHastaFilter] = useState<Dayjs | null>(
    dayjs()
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleDateFilterConfirmation = () => {
    if (fechaDesdeFilter && fechaHastaFilter) {
      updateRangeData(
        fechaDesdeFilter?.format('YYYY-MM-DD'),
        fechaHastaFilter?.format('YYYY-MM-DD')
      );
      setOpen(false);
    }
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      sx={{
        border: open ? 1 : 0,
        borderColor: open ? '#F5B223' : '#fff',
        borderRadius: 3,
        py: 0.3,
        px: 1,
      }}
    >
      <DateRangeOutlinedIcon sx={{ color: '#F5B223' }} />
      <Typography>{t('title')}</Typography>
      <IconButton onClick={handleClick}>
        {!open ? (
          <KeyboardArrowDownOutlinedIcon sx={{ color: '#F5B223' }} />
        ) : (
          <KeyboardArrowUpOutlinedIcon sx={{ color: '#F5B223' }} />
        )}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        style={{ zIndex: 10000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ bgcolor: '#fff', zIndex: 1 }}>
              <Box display="flex" sx={{ width: 800, height: 'auto', px: 4 }}>
                <Box sx={{ width: '100px' }}>
                  <List>
                    <ListItem
                      disablePadding
                      onClick={() => {
                        setRangeDateToday();
                        setStaticFilterValue(FILTERS_VALUES.today);
                      }}
                    >
                      <ListItemButton
                        selected={staticFilterValue === FILTERS_VALUES.today}
                      >
                        <ListItemText primary="Hoy" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      onClick={() => {
                        setRangeDateWeek();
                        setStaticFilterValue(FILTERS_VALUES.week);
                      }}
                    >
                      <ListItemButton
                        selected={staticFilterValue === FILTERS_VALUES.week}
                      >
                        <ListItemText primary="Semana" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      onClick={() => {
                        setRangeDateMonth();
                        setStaticFilterValue(FILTERS_VALUES.month);
                      }}
                    >
                      <ListItemButton
                        selected={staticFilterValue === FILTERS_VALUES.month}
                      >
                        <ListItemText primary="Mes" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      onClick={() => {
                        setStaticFilterValue(FILTERS_VALUES.year);
                        setRangeDateYear();
                      }}
                    >
                      <ListItemButton
                        selected={staticFilterValue === FILTERS_VALUES.year}
                      >
                        <ListItemText primary="Año" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
                <Box display="flex" flexDirection="column" sx={{ pb: 2 }}>
                  <Box display="flex">
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={localeSpanish}
                    >
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={fechaDesdeFilter}
                        onChange={(newValue) => {
                          setFechaDesdeFilter(newValue);
                          setStaticFilterValue('');
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={localeSpanish}
                    >
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={fechaHastaFilter}
                        onChange={(newValue) => {
                          setFechaHastaFilter(newValue);
                          setStaticFilterValue('');
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box display="flex" alignSelf="flex-end" gap={2}>
                    <Button color="error" onClick={() => setOpen(false)}>
                      <CloseOutlinedIcon
                        sx={{ fontSize: 20, marginRight: '5px' }}
                      />
                      Cancelar
                    </Button>
                    <Button
                      color="success"
                      onClick={() => {
                        if (!staticFilterValue) handleDateFilterConfirmation();
                        else setOpen(false);
                      }}
                    >
                      <CheckOutlinedIcon
                        sx={{ fontSize: 20, marginRight: '5px' }}
                      />
                      Aceptar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

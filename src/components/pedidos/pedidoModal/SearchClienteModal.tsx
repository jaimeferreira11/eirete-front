import { FC, KeyboardEvent, useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { FullScreenLoading, ListEmpty } from '@components/ui';
import { ICliente } from '@core/interfaces';
import { usePedidosProvider } from '@lib/hooks';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const SearchClienteModal: FC<Props> = ({ handleClose, show }) => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'clienteModal' });
  const { t: tForm } = useTranslation('pedidos', {
    keyPrefix: 'direccionPedido.form',
  });

  const { searchClienteByKey, setearClienteByModal, newPedido } =
    usePedidosProvider();

  const [isFetching, setIsFetching] = useState(false);

  const [clientesBusqueda, setClientesBusqueda] = useState<ICliente[]>([]);

  const [clienteSelected, setClienteSelected] = useState<
    ICliente | null | undefined
  >(null);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<{
    clave: string;
  }>({
    defaultValues: { clave: '' },
  });

  const onSubmit = async () => {
    setIsFetching(true);
    const values = getValues();

    // if (values.clave) {
    const clientesEncontrados = await searchClienteByKey(values.clave);
    console.log('clientesEncontrados', clientesEncontrados);
    console.log('values', values);
    setClientesBusqueda(clientesEncontrados);
    setIsFetching(false);
    // } else {
    //   trigger('clave');
    // }
  };

  const handleEnterBusqueda = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialogContent-root': {
            padding: 2,
          },
          '& .MuiDialogActions-root': {
            padding: 1,
          },
        }}
        fullWidth
        maxWidth="sm"
        open={show}
        onClose={() => {
          reset();
          handleClose();
        }}
      >
        <DialogTitle>{t('titleModal')}</DialogTitle>
        <DialogContent
          style={{
            maxHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container sx={{ width: '100%' }}>
            <Grid xs={12} item spacing={3} container sx={{ px: 1, mt: 0.1 }}>
              <Grid xs={11} item>
                <Controller
                  control={control}
                  name="clave"
                  rules={{ required: t('required') }}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      label={t('searchKey')}
                      onKeyDown={handleEnterBusqueda}
                      fullWidth
                      {...field}
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      error={!!errors.clave}
                      helperText={errors.clave?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1} sx={{ pl: 1 }}>
                <IconButton onClick={onSubmit} sx={{ bgcolor: 'transparent' }}>
                  <SearchIcon sx={{ color: '#F5B223' }} />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 6 }}>
              {isFetching && <FullScreenLoading />}
              {!isFetching && clientesBusqueda.length === 0 && (
                <ListEmpty
                  description={
                    getValues().clave ? t('empty') : t('ingreseClave')
                  }
                />
              )}
              {clientesBusqueda.length > 0 && !isFetching && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    {t('clientesEncontrados')}
                  </Typography>
                  <List component="nav" sx={{ width: '100%' }}>
                    {clientesBusqueda.map((cliente) => (
                      <ListItemButton
                        key={cliente._id}
                        selected={newPedido.cliente?._id === cliente._id}
                        onClick={() => setearClienteByModal(cliente)}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={cliente.persona.nombreApellido}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, display: 'flex' }}>
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ width: '100%' }}
              >
                <Button onClick={handleClose}>{t('volver')}</Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { FC, useEffect, useState } from 'react';

import { Direccion, ICiudad } from '@core/interfaces';
import { useCiudades, usePedidosProvider } from '@lib/hooks';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const PedidoDireccionModal: FC<Props> = ({ show, handleClose }) => {
  const { t } = useTranslation('pedidos', { keyPrefix: 'direccionPedido' });
  const { t: tForm } = useTranslation('pedidos', {
    keyPrefix: 'direccionPedido.form',
  });

  const {
    direccionDelivery,
    updateClienteDirecciones,
    updateClienteDireccionEnvio,
  } = usePedidosProvider();

  const { ciudades } = useCiudades();
  const [editMode, setEditMode] = useState(false);

  const [selectedDireccion, setSelectedDireccion] = useState<
    Direccion | null | undefined
  >(null);
  const [isFetching, setIsFetching] = useState(false);
  const [ciudadAux, setCiudadAux] = useState<ICiudad | null | undefined>(null);

  const {
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Direccion>({
    defaultValues: {
      _id: '',
      direccion: direccionDelivery?.direccion,
      contacto: direccionDelivery?.contacto,
      predeterminado: direccionDelivery?.predeterminado,
      obs: direccionDelivery?.obs,
    },
  });

  useEffect(() => {
    if (selectedDireccion) {
      setEditMode(false);
      setCiudadAux(
        ciudades
          ? ciudades?.find(
              (ciudad) => ciudad.descripcion === selectedDireccion.ciudad
            )
          : null
      );
      reset({
        direccion: selectedDireccion.direccion,
        contacto: selectedDireccion.contacto,
        predeterminado: selectedDireccion.predeterminado,
        obs: selectedDireccion.obs,
      });
    } else if (direccionDelivery) {
      setEditMode(false);
      setSelectedDireccion(direccionDelivery);
    } else {
      setEditMode(true);
      reset({
        direccion: '',
        contacto: '',
        predeterminado: false,
        obs: '',
      });
      setCiudadAux(null);
    }
  }, [ciudades, direccionDelivery, reset, selectedDireccion]);

  const { direccionesCliente } = usePedidosProvider();

  const onSubmit = async () => {
    setIsFetching(true);
    const values = getValues();

    if (selectedDireccion && editMode) {
      await updateClienteDirecciones({
        ...values,
        ciudad: values.ciudad || direccionDelivery?.ciudad!,
        _id: selectedDireccion._id,
      });
    } else if (editMode) {
      await updateClienteDirecciones({
        ...values,
        ciudad: values.ciudad || direccionDelivery?.ciudad!,
      });
    }
    reset({
      direccion: '',
      contacto: '',
      predeterminado: false,
      obs: '',
    });
    setIsFetching(false);
    setCiudadAux(null);
    setEditMode(false);
    handleClose();
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
          <Grid spacing={3} container sx={{ px: 1, mt: 0.2 }}>
            <Grid xs={12} item>
              <Autocomplete
                disablePortal
                id="combo-direcciones-cliente"
                options={direccionesCliente}
                getOptionLabel={(option) => option.direccion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={tForm('direccionesRegistradas')}
                  />
                )}
                value={selectedDireccion}
                onChange={(event: any, newValue: Direccion | null) => {
                  setSelectedDireccion(newValue);
                  if (newValue) updateClienteDireccionEnvio(newValue);
                }}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                control={control}
                name="direccion"
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label={tForm('direccion')}
                    fullWidth
                    {...field}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    error={!!errors.direccion}
                    helperText={errors.direccion?.message}
                    disabled={!editMode}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="ciudad"
                rules={{ required: tForm('required') }}
                render={({ field: { ref, onChange, ...field } }) => {
                  return (
                    <Autocomplete
                      options={ciudades || []}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value?._id
                      }
                      getOptionLabel={(option) => option.descripcion}
                      onChange={(_, data) => {
                        setCiudadAux(data);
                        onChange(data?.descripcion);
                      }}
                      value={ciudadAux}
                      disabled={!editMode}
                      renderInput={(params) => (
                        <TextField
                          label={tForm('ciudad')}
                          {...params}
                          {...field}
                          inputRef={ref}
                          fullWidth
                          error={!!errors.ciudad}
                          helperText={errors.ciudad?.message}
                          disabled={!editMode}
                        />
                      )}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                control={control}
                name="contacto"
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label={tForm('nroContacto')}
                    fullWidth
                    {...field}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    error={!!errors.contacto}
                    helperText={errors.contacto?.message}
                    disabled={!editMode}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} item>
              <FormControlLabel
                value={false}
                control={
                  <Controller
                    name={'predeterminado'}
                    control={control}
                    render={({ field: { ref, onChange, ...field } }) => (
                      <Checkbox
                        {...field}
                        ref={ref}
                        checked={field.value}
                        onChange={(e, value) => onChange(value)}
                        disabled={!editMode}
                      />
                    )}
                  />
                }
                label={tForm('predeterminado')}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                control={control}
                name="obs"
                rules={{ required: tForm('required') }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={tForm('notasPedido')}
                    placeholder={tForm('notasPedidoPlaceholder')}
                    multiline
                    minRows={3}
                    variant="standard"
                    fullWidth
                    disabled={!editMode}
                  />
                )}
              />
            </Grid>

            <Grid xs={6} item>
              {selectedDireccion && (
                <Button
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => setEditMode(true)}
                >
                  {tForm('editData')}
                </Button>
              )}
            </Grid>

            <Grid container xs={6} item spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleClose}
                  color="error"
                  startIcon={<CloseOutlinedIcon />}
                  disabled={isFetching}
                >
                  <Typography>{tForm('volver')}</Typography>
                </Button>
              </Grid>
              {editMode && (
                <Grid item>
                  <Button
                    onClick={onSubmit}
                    color="success"
                    sx={{ color: 'white' }}
                    disabled={!editMode}
                  >
                    {!isFetching && (
                      <CheckOutlinedIcon
                        sx={{ fontSize: 20, marginRight: '5px' }}
                      />
                    )}
                    {isFetching ? (
                      <CircularProgress size="25px" />
                    ) : (
                      <Typography>{tForm('guardar')}</Typography>
                    )}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

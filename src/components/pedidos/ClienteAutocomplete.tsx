import { useEffect, useState } from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { ICliente } from '../../core/interfaces/cliente';

import { usePedidosProvider } from '@lib/hooks';
import useSWR from 'swr';

export const ClienteAutocomplete = () => {
  const { setCliente, newPedido } = usePedidosProvider();

  const { cliente } = newPedido;

  const [value, setValue] = useState<ICliente | null>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<readonly ICliente[]>([]);
  const [doFecth, setdoFecth] = useState(false);

  const { data } = useSWR(
    doFecth ? `/clientes?limite=20&desde=0&estado=true&search=${search}` : null
  );

  useEffect(() => {
    if (!cliente) setValue(null);
  }, [cliente]);

  useEffect(() => {
    let active = true;

    if (active && data) {
      setOptions([...data.data]);
      setdoFecth(false);
    }
    // (async () => {
    //   const { data } = await mutate(
    //     '/clientes?limite=20&desde=0&estado=true',
    //     eireteApi.get('/clientes?limite=20&desde=0&estado=true'),
    //     {}
    //   ); // For demo purposes.

    //   console.log('data', data);
    //   if (active && data) {
    //     setOptions([...data.data]);
    //   }
    // })();

    return () => {
      active = false;
    };
  }, [data]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-client"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
        setdoFecth(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.persona._id === value.persona._id
      }
      onChange={(event, value) => {
        if (value) setCliente(value);
        setValue(value);
      }}
      value={value}
      getOptionLabel={(option) => option.persona.nombreApellido}
      options={options}
      loading={doFecth}
      onInputChange={(event, value) => {
        if (!value) {
          setSearch('');
          setdoFecth(true);
        }
      }}
      filterOptions={(x, state) => {
        if (state.inputValue && !search) {
          const result = x.filter((item) =>
            item.persona.nombreApellido
              .toLowerCase()
              .includes(state.inputValue.toLowerCase())
          );

          if (result.length === 0) {
            setSearch(state.inputValue.toLowerCase());
            setdoFecth(true);
          }

          return result;
        }

        return x;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cliente"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {doFecth ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

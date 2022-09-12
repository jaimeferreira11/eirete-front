import { MovimientosContext } from '@lib/context';
import { useContext } from 'react';

export const useMovimientosProvider = () => {
  const providerState = useContext(MovimientosContext);

  return { ...providerState };
};

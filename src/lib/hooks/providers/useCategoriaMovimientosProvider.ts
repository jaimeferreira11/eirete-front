import { CategoriaMovimientosContext } from '@lib/context';
import { useContext } from 'react';

export const useCategoriaMovimientosProvider = () => {
  const providerState = useContext(CategoriaMovimientosContext);

  return { ...providerState };
};

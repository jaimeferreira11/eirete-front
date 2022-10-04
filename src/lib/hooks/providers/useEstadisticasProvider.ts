import { EstadisticasContext } from '@lib/context';
import { useContext } from 'react';

export const useEstadisticasProvider = () => {
  const providerState = useContext(EstadisticasContext);

  return { ...providerState };
};

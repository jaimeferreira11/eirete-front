import { CajasContext } from '@lib/context/Cajas';
import { useContext } from 'react';

export const useCajasProvider = () => {
  const providerState = useContext(CajasContext);

  return { ...providerState };
};

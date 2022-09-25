import { CierreCajaContext } from '@lib/context/CierreCaja';
import { useContext } from 'react';

export const useCierraCajaProvider = () => {
  const providerState = useContext(CierreCajaContext);

  return { ...providerState };
};

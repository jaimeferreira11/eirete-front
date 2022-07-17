import { LineasContext } from '@lib/context/LineaArticulos';
import { useContext } from 'react';

export const useLineasProvider = () => {
  const providerState = useContext(LineasContext);

  return { ...providerState };
};

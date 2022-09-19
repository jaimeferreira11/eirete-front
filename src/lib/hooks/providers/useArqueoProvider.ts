import { ArqueoContext } from '@lib/context';
import { useContext } from 'react';

export const useArqueoProvider = () => {
  const providerState = useContext(ArqueoContext);

  return { ...providerState };
};

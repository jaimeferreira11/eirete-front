import { useContext } from 'react';

import { EnviosContext } from '@lib/context/Envios';

export const useEnvioProvider = () => {
  const providerState = useContext(EnviosContext);

  return { ...providerState };
};

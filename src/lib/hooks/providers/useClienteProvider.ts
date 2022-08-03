import { useContext } from 'react';

import { ClienteContext } from '@lib/context';

export const useClienteProvider = () => {
  const providerState = useContext(ClienteContext);

  return { ...providerState };
};

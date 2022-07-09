import { useContext } from 'react';

import { SucursalesContext } from '@lib/context';

export const useSucuralesProvider = () => {
  const providerState = useContext(SucursalesContext);

  return { ...providerState };
};

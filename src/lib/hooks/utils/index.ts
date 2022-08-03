import { useContext } from 'react';

import { UtilsContext } from '@lib/context/Utils';

export const useUtilsProvider = () => {
  const providerState = useContext(UtilsContext);

  return { ...providerState };
};

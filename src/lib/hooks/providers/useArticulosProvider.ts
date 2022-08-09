import { useContext } from 'react';

import { ArticulosContext } from '@lib/context/Articulos';

export const useArticulosProvider = () => {
  const providerState = useContext(ArticulosContext);

  return { ...providerState };
};

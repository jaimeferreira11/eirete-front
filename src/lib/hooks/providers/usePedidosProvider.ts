import { useContext } from 'react';

import { PedidosContext } from '@lib/context';

export const usePedidosProvider = () => {
  const providerState = useContext(PedidosContext);

  return { ...providerState };
};

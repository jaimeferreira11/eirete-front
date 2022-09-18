import { useContext } from 'react';

import { StockSucursalContext } from '@lib/context/StockSucursal';

export const useStockSucursalProvider = () => {
  const providerState = useContext(StockSucursalContext);

  return { ...providerState };
};

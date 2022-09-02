import eireteApi from '@core/api';

import { useCallback } from 'react';

export const usePedidoService = () => {
  const addPedido = useCallback(async (newPedido: any) => {
    await eireteApi.post('/pedidos', newPedido);
  }, []);

  return { addPedido };
};

import eireteApi from '@core/api';
import { DeliveryEstado } from '@core/interfaces/delivery';

import { useCallback } from 'react';

export const usePedidoService = () => {
  const addPedido = useCallback(async (newPedido: any) => {
    await eireteApi.post('/pedidos', newPedido);
  }, []);

  const changeStatusDelivery = async (
    pedidoId: string,
    newState: DeliveryEstado
  ) => {
    await eireteApi.put(
      `/pedidos/change-estado-delivery/${pedidoId}/${newState}`
    );
  };

  return { addPedido, changeStatusDelivery };
};

export type DeliveryEstado =
  | 'EN_ESPERA'
  | 'EN_CAMINO'
  | 'ENTREGADO'
  | 'PERDIDO';

export const DeliveryEstadoArray = [
  { value: 'EN_ESPERA', description: 'EN ESPERA' },
  { value: 'EN_CAMINO', description: 'EN CAMINO' },
  { value: 'ENTREGADO', description: 'ENTREGADO' },
  { value: 'PERDIDO', description: 'PERDIDO' },
];

export const DeliveryEstadoColors = {
  EN_ESPERA: 'warning',
  EN_CAMINO: 'info',
  ENTREGADO: 'success',
  PERDIDO: 'error',
};

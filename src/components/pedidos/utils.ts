import { IPedidoDetalle } from '@core/interfaces';

export const getPedidoString = (detalle: IPedidoDetalle[]) => {
  let detalleString = '';
  detalle.forEach(
    (item) =>
      (detalleString = `${detalleString}• ${item.articulo.descripcion} x ${item.cantidad}`)
  );
  return detalleString;
};

import { IPedidoDetalle, MetodosPago, TipoImpuesto } from '@core/interfaces';

export const getImpuestos = (detalle: IPedidoDetalle[]) => {
  let impuesto5 = 0;
  let impuesto10 = 0;
  detalle.forEach((element) => {
    if (element.tipoImpuesto === 5)
      impuesto5 += calculateImpuesto(
        5,
        element.precioUnitario * element.cantidad
      );
    else if (element.tipoImpuesto === 10)
      impuesto10 += calculateImpuesto(
        10,
        element.precioUnitario * element.cantidad
      );
  });

  return { impuesto5, impuesto10 };
};

export const getMontosDetalle = (metodos: MetodosPago[]) => {
  let montoEfectivo = 0;
  let montoCheque = 0;
  let montoTarjeta = 0;
  metodos.forEach((element) => {
    if (element.descripcion === 'EFECTIVO') montoEfectivo += element.importe;
    else if (element.descripcion === 'TARJETA') montoTarjeta += element.importe;
    else if (element.descripcion === 'CHEQUE') montoCheque += element.importe;
  });

  return { montoEfectivo, montoCheque, montoTarjeta };
};

const calculateImpuesto = (tipo: TipoImpuesto, amount: number) => {
  switch (tipo) {
    case 10:
      return amount / 11;
    case 5:
      return amount / 21;
    default:
      return 0;
  }
};

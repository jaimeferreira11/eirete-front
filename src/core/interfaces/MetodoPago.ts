export type TiposPago = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'CHEQUE';

export interface IMetodoPago {
  importe: number;
  descripcion: string;
  referencia?: string;
}

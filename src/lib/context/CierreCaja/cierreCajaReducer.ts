import { ICashCierreCaja } from '@core/interfaces';

type cierreCajaType =
  | { type: 'ChangeReponsable'; payload: string }
  | { type: 'UpdateMonedas'; payload: ICashCierreCaja[] }
  | { type: 'UpdateBilletes'; payload: ICashCierreCaja[] };

export const cierreCajaReducer = (
  state: Object,
  action: cierreCajaType
): Object => {
  switch (action.type) {
    default:
      return state;
  }
};

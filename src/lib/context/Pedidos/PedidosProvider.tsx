import { IArticuloStock, TipoImpuesto } from '@core/interfaces';
import { useAuthProvider, useUtilsProvider } from '@lib/hooks';
import { Detalle, INewPedido } from '@lib/interfaces';
import { FC, useEffect, useReducer } from 'react';
import { ICliente } from '../../../core/interfaces/cliente';
import { TipoPedido } from '../../../core/interfaces/TipoPedidos';
import { PedidosContext, pedidosReducer } from './';

export interface PedidosState {
  newPedido: INewPedido;
}

const PEDIDOS_INITIAL_STATE: PedidosState = {
  newPedido: {
    cliente: undefined,
    detalles: [],
    importeTotal: 0,
    impuesto: 0,
    montoRecibido: 0,
    sucursal: undefined,
    vuelto: 0,
    tipoPedido: 'REGULAR',
    exentoIVA: false,
  },
};
interface Props {
  children?: React.ReactNode;
}

export const PedidosProvider: FC<Props> = ({ children }) => {
  const { showSnackbar } = useUtilsProvider();

  const { user } = useAuthProvider();
  const [state, dispatch] = useReducer(pedidosReducer, PEDIDOS_INITIAL_STATE);

  useEffect(() => {
    if (!state.newPedido.sucursal && user?.sucursal)
      dispatch({ type: 'SetSucursalID', payload: user?.sucursal! });
  }, [state.newPedido.sucursal, user?.sucursal]);

  const setCliente = (cliente: ICliente) => {
    dispatch({
      type: 'SetCliente',
      payload: {
        _id: cliente._id,
        persona: {
          nroDoc: cliente.persona.nroDoc,
          ruc: cliente.persona.tipoDoc === 'RUC' ? cliente.persona.nroDoc : '',
        },
      },
    });
  };

  const setTipoPedido = (tipoPedido: TipoPedido) => {
    dispatch({
      type: 'SetTipoPedido',
      payload: tipoPedido,
    });
  };

  const setArticuloDetalle = (
    item: IArticuloStock,
    stockDisponible: number
  ) => {
    const productInCart = state.newPedido.detalles.some(
      (p) => p.articulo._id === item._id
    );

    if (!productInCart)
      return dispatch({
        type: 'UpdateDetalleAndTotals',
        payload: {
          detalle: [
            ...state.newPedido.detalles,
            {
              articulo: { _id: item._id },
              cantidad: 1,
              codigo: `${item.codigo}`,
              descripcion: item.descripcion,
              precioUnitario: item.precioVenta,
              tipoImpuesto: item.tipoImpuesto,
              stockDisponible,
            },
          ],
          addAmount: item.precioVenta,
          impuestoAmount: calculateImpuesto(
            item.tipoImpuesto as TipoImpuesto,
            item.precioVenta
          ),
        },
      });

    let addAmount = 0;
    let impuestoAmount = 0;
    let cantidadToUpdate = 0;
    const updateProducts = state.newPedido.detalles.map((p) => {
      if (p.articulo._id !== item._id) return p;

      const newCantidad = p.cantidad + 1;
      cantidadToUpdate = newCantidad;
      impuestoAmount += calculateImpuesto(
        item.tipoImpuesto as TipoImpuesto,
        item.precioVenta
      );

      addAmount += p.precioUnitario;
      return { ...p, cantidad: newCantidad };
    });

    if (cantidadToUpdate > stockDisponible) {
      showSnackbar({
        message: `Se alcanzó el limite de stock disponible para articulo: ${item.descripcion}`,
        type: 'warning',
        show: true,
      });
      return;
    }
    dispatch({
      type: 'UpdateDetalleAndTotals',
      payload: {
        detalle: updateProducts,
        addAmount,
        impuestoAmount,
      },
    });
  };

  const updateCantidad = (detalle: Detalle, cantidad: number) => {
    let addAmount = 0;
    let impuestoAmount = 0;
    let cantidadToUpdate = 0;
    let stockDisponible = 0;
    const updateProducts = state.newPedido.detalles.map((p) => {
      if (p.articulo._id !== detalle.articulo._id) return p;

      const newCantidad = p.cantidad + cantidad;
      cantidadToUpdate = newCantidad;
      addAmount += p.precioUnitario * cantidad;
      stockDisponible = p.stockDisponible;
      impuestoAmount +=
        calculateImpuesto(
          detalle.tipoImpuesto as TipoImpuesto,
          detalle.precioUnitario
        ) * cantidad;
      return { ...p, cantidad: newCantidad };
    });

    if (cantidadToUpdate > stockDisponible) {
      showSnackbar({
        message: `Se alcanzó el limite de stock disponible para articulo: ${detalle.descripcion}`,
        type: 'warning',
        show: true,
      });
      return;
    }

    dispatch({
      type: 'UpdateDetalleAndTotals',
      payload: { detalle: updateProducts, addAmount, impuestoAmount },
    });
  };

  const getDetalle = (): Detalle[] => {
    return state.newPedido.detalles;
  };

  const removeArticuloFromDetalle = (detalle: Detalle) => {
    let addAmount = 0;
    let impuestoAmount = 0;
    const updateProducts = state.newPedido.detalles.filter((product) => {
      if (product.articulo._id !== detalle.articulo._id) return true;

      addAmount -= product.cantidad * product.precioUnitario;
      impuestoAmount -=
        product.cantidad *
        calculateImpuesto(
          product.tipoImpuesto as TipoImpuesto,
          product.precioUnitario
        );
      return false;
    });

    dispatch({
      type: 'UpdateDetalleAndTotals',
      payload: { detalle: updateProducts, addAmount, impuestoAmount },
    });
  };

  const resetPedido = () => {
    dispatch({
      type: 'ResetPedido',
      payload: PEDIDOS_INITIAL_STATE.newPedido,
    });
  };

  const isPedidoComplete = (): boolean =>
    state.newPedido.cliente !== undefined &&
    state.newPedido.detalles.length > 0 &&
    state.newPedido.montoRecibido > 0;

  const getImpuesto10 = () => {
    let impuesto = 0;
    state.newPedido.detalles.forEach((element) => {
      if (element.tipoImpuesto === 10)
        impuesto += calculateImpuesto(
          10,
          element.precioUnitario * element.cantidad
        );
    });

    return Math.round(impuesto);
  };

  const getImpuesto5 = () => {
    let impuesto = 0;
    state.newPedido.detalles.forEach((element) => {
      if (element.tipoImpuesto === 5)
        impuesto += calculateImpuesto(
          5,
          element.precioUnitario * element.cantidad
        );
    });

    return Math.round(impuesto);
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

  const setMontoRecibido = (value: string) => {
    if (value) {
      dispatch({ type: 'UpdateMontoRecibido', payload: Number(value) });
      return;
    }

    dispatch({ type: 'UpdateMontoRecibido', payload: 0 });
  };

  return (
    <PedidosContext.Provider
      value={{
        ...state,
        setCliente,
        setTipoPedido,
        resetPedido,
        setArticuloDetalle,
        getDetalle,
        updateCantidad,
        removeArticuloFromDetalle,
        isPedidoComplete,
        getImpuesto10,
        getImpuesto5,
        setMontoRecibido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

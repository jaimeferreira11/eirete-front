import eireteApi from '@core/api';
import { IArticuloStock, IEnpointResult, TipoImpuesto } from '@core/interfaces';
import { useAuthProvider, useUtilsProvider } from '@lib/hooks';
import { Detalle, INewPedido } from '@lib/interfaces';
import { AxiosError } from 'axios';
import { FC, useEffect, useReducer } from 'react';
import { ICliente } from '../../../core/interfaces/cliente';
import { TiposPago } from '../../../core/interfaces/MetodoPago';
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
    metodosPago: [],
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

  const searchCliente = async (
    nroDocumento: string
  ): Promise<{ errorMessage?: string; ruc?: string }> => {
    try {
      const { data: cliente } = await eireteApi.get<ICliente>(
        `/clientes/search/persona/nrodoc/${nroDocumento}`
      );

      dispatch({
        type: 'SetCliente',
        payload: {
          _id: cliente._id,
          persona: {
            nroDoc: cliente.persona.nroDoc,
            ruc: cliente.persona.ruc,
            nombreApellido: cliente.persona.nombreApellido,
          },
        },
      });
      return { ruc: cliente.persona.ruc };
    } catch (error) {
      // Si no existe se registrará
      dispatch({
        type: 'SetCliente',
        payload: undefined,
      });
      return {
        errorMessage: (error as AxiosError).message || 'Usuario no existe',
      };
    }
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
    getTotal() > 0 &&
    getVuelto() >= 0;

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

  const toogleExtentoIVA = () => dispatch({ type: 'UpdateExentoIVA' });

  const updateMetodosPago = ({
    descripcion,
    importe,
    referencia = '',
  }: {
    descripcion: TiposPago;
    importe: number;
    referencia?: string;
  }) => {
    const filterPagos = state.newPedido.metodosPago.filter(
      (metodo) => metodo.descripcion !== descripcion
    );

    const nuevosMetodosPago = [
      ...filterPagos,
      { descripcion, importe, referencia },
    ];
    let nuevoMontoRecibido = 0;
    nuevosMetodosPago.forEach(
      (metodo) => (nuevoMontoRecibido += metodo.importe)
    );

    dispatch({
      type: 'UpdateMetodosPago',
      payload: { nuevosMetodosPago, nuevoMontoRecibido },
    });
  };

  const getMontoMetodoPago = (tipo: TiposPago) => {
    const filterPagos = state.newPedido.metodosPago.find(
      (metodo) => metodo.descripcion === tipo
    );

    if (filterPagos) return filterPagos.importe;

    return 0;
  };

  const getTotal = () => {
    let total = 0;
    state.newPedido.metodosPago.forEach((metodo) => (total += metodo.importe));

    return total;
  };

  const submitPedido = async (): Promise<IEnpointResult> => {
    try {
      await eireteApi.post('/pedidos', {
        ...state.newPedido,
        vuelto: getVuelto(),
      });

      return {
        hasError: false,
      };
    } catch (error) {
      return {
        hasError: true,
        message: (error as AxiosError).message,
      };
    }
  };

  const getVuelto = () => {
    return getTotal() - state.newPedido.importeTotal;
  };

  const updateRazonSocial = (razonSocial: string) => {
    const cliente = state.newPedido.cliente;

    if (cliente?.persona.nombreApellido === '')
      dispatch({
        type: 'SetCliente',
        payload: {
          ...cliente,
          persona: { ...cliente.persona, nombreApellido: razonSocial },
        },
      });
  };

  const cancelarPedido = async (
    pedidoId: string,
    motivo: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/pedidos/change-status/${pedidoId}/CANCELADO`, {
        motivo,
      });

      return {
        hasError: false,
      };
    } catch (error) {
      return {
        hasError: true,
        message: (error as AxiosError).message,
      };
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        ...state,
        cancelarPedido,
        getDetalle,
        getImpuesto10,
        getImpuesto5,
        getTotal,
        getMontoMetodoPago,
        getVuelto,
        isPedidoComplete,
        removeArticuloFromDetalle,
        resetPedido,
        searchCliente,
        setArticuloDetalle,
        setCliente,
        setTipoPedido,
        submitPedido,
        toogleExtentoIVA,
        updateCantidad,
        updateMetodosPago,
        updateRazonSocial,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

import eireteApi from '@core/api';
import {
  DeliveryEstado,
  Direccion,
  IArticuloStock,
  ICliente,
  IEnpointResult,
  TipoImpuesto,
} from '@core/interfaces';
import { useClienteService } from '@core/services/ClienteService';
import { usePedidoService } from '@core/services/PedidoService';
import { useAuthProvider, useUtilsProvider } from '@lib/hooks';
import { Detalle, INewPedido } from '@lib/interfaces';
import { AxiosError } from 'axios';
import { FC, useEffect, useReducer } from 'react';
import { TiposPago } from '../../../core/interfaces/MetodoPago';
import { TipoPedido } from '../../../core/interfaces/TipoPedidos';
import { PedidosContext, pedidosReducer } from './';

export interface PedidosState {
  newPedido: INewPedido;
  direccionesCliente: Direccion[];
  direccionDelivery: Direccion | undefined;
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
  direccionesCliente: [],
  direccionDelivery: undefined,
};
interface Props {
  children?: React.ReactNode;
}

export const PedidosProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthProvider();
  const { addPedido, changeStatusDelivery } = usePedidoService();

  const {
    searchClienteByNroDocumento,
    addDireccionEntrega,
    searchClienteGeneral,
  } = useClienteService();

  const { showSnackbar } = useUtilsProvider();

  const [state, dispatch] = useReducer(pedidosReducer, PEDIDOS_INITIAL_STATE);

  useEffect(() => {
    if (!state.newPedido.sucursal && user?.sucursal._id)
      dispatch({ type: 'SetSucursalID', payload: user?.sucursal!._id });
  }, [state.newPedido.sucursal, user?.sucursal._id]);

  useEffect(() => {
    if (state.newPedido.detalles.length === 0)
      dispatch({
        type: 'UpdateMetodosPago',
        payload: { nuevosMetodosPago: [], nuevoMontoRecibido: 0 },
      });
  }, [state.newPedido.detalles.length]);

  const searchCliente = async (
    nroDocumento: string
  ): Promise<{ errorMessage?: string; ruc?: string }> => {
    try {
      const cliente = await searchClienteByNroDocumento(nroDocumento);

      const defaultDireccion = cliente.direcciones?.find(
        (direccion) => direccion.predeterminado
      );

      dispatch({
        type: 'SetCliente',
        payload: {
          cliente: {
            _id: cliente._id,
            persona: {
              nroDoc: cliente.persona.nroDoc,
              ruc: cliente.persona.ruc,
              nombreApellido: cliente.persona.nombreApellido,
            },
          },
          direcciones: cliente.direcciones || [],
          defaultDireccion,
        },
      });
      return { ruc: cliente.persona.ruc };
    } catch (error) {
      // Si no existe se registrará
      dispatch({
        type: 'SetCliente',
        payload: {
          cliente: {
            _id: undefined,
            persona: {
              _id: undefined,
              nroDoc: nroDocumento,
              nombreApellido: '',
            },
          },
          direcciones: [],
          defaultDireccion: undefined,
        },
      });
      return {
        ruc: nroDocumento,
        errorMessage: (error as AxiosError).message,
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

    const exentoIva = state.newPedido.exentoIVA;

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
          addAmount: !exentoIva
            ? item.precioVenta
            : item.precioVenta -
              calculateImpuesto(
                item.tipoImpuesto as TipoImpuesto,
                item.precioVenta
              ),
          impuestoAmount: exentoIva
            ? 0
            : calculateImpuesto(
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
        impuestoAmount: exentoIva ? 0 : impuestoAmount,
      },
    });
  };

  const updateCantidad = (detalle: Detalle, cantidad: number) => {
    let addAmount = 0;
    let impuestoAmount = 0;
    let cantidadToUpdate = 0;
    let stockDisponible = 0;
    const exentoIva = state.newPedido.exentoIVA;
    const updateProducts = state.newPedido.detalles.map((p) => {
      if (p.articulo._id !== detalle.articulo._id) return p;

      const newCantidad = p.cantidad + cantidad;
      cantidadToUpdate = newCantidad;
      addAmount += !state.newPedido.exentoIVA
        ? p.precioUnitario * cantidad
        : (p.precioUnitario -
            calculateImpuesto(
              p.tipoImpuesto as TipoImpuesto,
              p.precioUnitario
            )) *
          cantidad;

      stockDisponible = p.stockDisponible;
      impuestoAmount += exentoIva
        ? 0
        : calculateImpuesto(
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
      payload: {
        detalle: updateProducts,
        addAmount,
        impuestoAmount: exentoIva ? 0 : impuestoAmount,
      },
    });
  };

  const getDetalle = (): Detalle[] => {
    return state.newPedido.detalles;
  };

  const removeArticuloFromDetalle = (detalle: Detalle) => {
    let addAmount = 0;
    let impuestoAmount = 0;
    const exentoIva = state.newPedido.exentoIVA;
    const updateProducts = state.newPedido.detalles.filter((product) => {
      if (product.articulo._id !== detalle.articulo._id) return true;

      addAmount -= calculateAmountExentOrNot(product);
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
      payload: {
        detalle: updateProducts,
        addAmount,
        impuestoAmount: exentoIva ? 0 : impuestoAmount,
      },
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
    const exentoIva = state.newPedido.exentoIVA;

    if (exentoIva) return Math.round(0);

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
    const exentoIva = state.newPedido.exentoIVA;
    if (exentoIva) return Math.round(0);
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

  const toogleExtentoIVA = () => {
    let nuevoTotal = 0;
    state.newPedido.detalles.forEach((p) => {
      nuevoTotal += calculateAmountPedidoExenta(p);
    });
    dispatch({ type: 'UpdateExentoIVA', payload: nuevoTotal });
  };

  const calculateAmountExentOrNot = (p: Detalle) => {
    const totalProducto = p.precioUnitario * p.cantidad;
    const impuestosProducto = state.newPedido.exentoIVA
      ? calculateImpuesto(p.tipoImpuesto as TipoImpuesto, totalProducto)
      : 0;
    return totalProducto - impuestosProducto;
  };

  const calculateAmountPedidoExenta = (p: Detalle) => {
    const totalProducto = p.precioUnitario * p.cantidad;
    const impuestosProducto = state.newPedido.exentoIVA
      ? 0
      : calculateImpuesto(p.tipoImpuesto as TipoImpuesto, totalProducto);
    return totalProducto - impuestosProducto;
  };

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
      await addPedido({
        ...state.newPedido,
        vuelto: getVuelto(),
        direccionEnvio: state.direccionDelivery,
        turno: user?.turno!,
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

  const changeStatusDeliveryPedido = async (
    pedidoId: string,
    newStatus: DeliveryEstado
  ): Promise<IEnpointResult> => {
    try {
      await changeStatusDelivery(pedidoId, newStatus);

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
        type: 'SetClienteRazonSocial',
        payload: razonSocial,
      });

    dispatch({
      type: 'SetClienteRazonSocial',
      payload: razonSocial,
    });
  };

  const cancelarPedido = async (
    pedidoId: string,
    motivoCancelacion: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/pedidos/change-status/${pedidoId}/CANCELADO`, {
        motivoCancelacion,
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

  const updateClienteDirecciones = async (
    newDireccion: Direccion
  ): Promise<IEnpointResult> => {
    let newDirecciones = [];
    if (newDireccion._id) {
      const filtrado = state.direccionesCliente.filter(
        (dir) => dir._id !== newDireccion._id
      );
      newDirecciones = [...filtrado, newDireccion];
    } else {
      newDirecciones = [...state.direccionesCliente, newDireccion];
    }

    try {
      const result = await addDireccionEntrega(
        newDirecciones,
        state.newPedido.cliente?._id!
      );

      dispatch({
        type: 'UpdateDireccionesCliente',
        payload: {
          direcciones: result.direcciones,
          nuevaDireccionDelivery: newDireccion,
        },
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

  const updateClienteDireccionEnvio = (newDireccion: Direccion) => {
    dispatch({
      type: 'UpdateDireccionEnvio',
      payload: newDireccion,
    });
  };

  const searchClienteByKey = (_clave: string): Promise<ICliente[]> => {
    return searchClienteGeneral(_clave);
  };

  const setearClienteByModal = (_cliente: ICliente) => {
    const defaultDireccion = _cliente.direcciones?.find(
      (direccion) => direccion.predeterminado
    );
    dispatch({
      type: 'SetCliente',
      payload: {
        cliente: {
          _id: _cliente._id,
          persona: {
            nroDoc: _cliente.persona.nroDoc,
            ruc: _cliente.persona.ruc,
            nombreApellido: _cliente.persona.nombreApellido,
          },
        },
        direcciones: _cliente.direcciones || [],
        defaultDireccion,
      },
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        ...state,
        cancelarPedido,
        changeStatusDeliveryPedido,
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
        searchClienteByKey,
        setArticuloDetalle,
        setTipoPedido,
        setearClienteByModal,
        submitPedido,
        toogleExtentoIVA,
        updateCantidad,
        updateMetodosPago,
        updateRazonSocial,
        updateClienteDirecciones,
        updateClienteDireccionEnvio,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

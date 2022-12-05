import { FC, useEffect, useReducer } from 'react';

import eireteApi from '@core/api';
import {
  IArticuloMovimiento,
  IArticuloStock,
  IEnpointResult,
} from '@core/interfaces';
import { useAuthProvider, useSucursal, useUtilsProvider } from '@lib/hooks';
import { IEnvioDetalle, IEnvioNuevo } from '@lib/interfaces';
import { AxiosError } from 'axios';
import { enviosReducer } from '.';
import { EnviosContext } from './EnviosContext';

export interface ISucursalEnvio {
  _id: string;
  descripcion: string;
}

export interface NewEnvioState {
  newEnvio: IEnvioNuevo;
  sucursalesPosibles: ISucursalEnvio[];
  envioRealizado?: IArticuloMovimiento;
}

export const NEW_ENVIO_INITIAL_STATE: NewEnvioState = {
  newEnvio: {
    detalles: [],
    sucursalDestino: '',
    sucursalOrigen: '',
  },
  envioRealizado: undefined,
  sucursalesPosibles: [],
};

interface Props {
  children?: React.ReactNode;
}

export const EnviosProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthProvider();
  const { showSnackbar } = useUtilsProvider();
  const [state, dispatch] = useReducer(enviosReducer, NEW_ENVIO_INITIAL_STATE);
  const { sucursales, isLoading } = useSucursal();

  useEffect(() => {
    if (!state.newEnvio.sucursalOrigen && user?.sucursal._id)
      dispatch({
        type: 'SetNewEnvioOnStart',
        payload: { sucursalOrigen: user?.sucursal._id! },
      });

    return () => {};
  }, [state.newEnvio.sucursalOrigen, user?.sucursal._id]);

  useEffect(() => {
    if (
      state.sucursalesPosibles.length === 0 &&
      !isLoading &&
      user?.sucursal &&
      sucursales
    )
      dispatch({
        type: 'SetSucursalesPosibles',
        payload: sucursales
          ?.filter((s) => s._id !== user?.sucursal._id)
          .map((sc) => ({ _id: sc._id, descripcion: sc.descripcion })),
      });

    return () => {};
  }, [
    isLoading,
    state.sucursalesPosibles,
    sucursales,
    user?.sucursal,
    user?.sucursal._id,
  ]);

  const getDetalle = (): IEnvioDetalle[] => state.newEnvio.detalles;
  const setSucursalDestino = (sucursalDestino: string): void =>
    dispatch({
      type: 'SetSucursalDestino',
      payload: { sucursalDestino },
    });

  //
  const rechazarEnvio = async (
    body: IArticuloMovimiento
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/articulo-movimientos/recibir/${body._id}/null`, {
        ...body,
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

  const recibirEnvio = async (
    body: IArticuloMovimiento,
    codigo: string
  ): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(
        `/articulo-movimientos/recibir/${body._id}/${codigo}`,
        {
          ...body,
        }
      );

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

  const reponerStock = async (_id: string): Promise<IEnpointResult> => {
    try {
      await eireteApi.put(`/articulo-movimientos/reponer/${_id}`);

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

  const setArticuloDetalle = (
    item: IArticuloStock,
    stockDisponible: number
  ) => {
    const productInCart = state.newEnvio.detalles.some(
      (p) => p.articulo._id === item._id
    );

    if (!productInCart)
      return dispatch({
        type: 'UpdateDetalles',
        payload: {
          newDetalle: [
            ...state.newEnvio.detalles,
            {
              articulo: {
                _id: item._id,
                codigo: `${item.codigo}`,
                descripcion: item.descripcion,
              },
              enviado: 1,
              stockDisponible,
            },
          ],
        },
      });

    let cantidadToUpdate = 0;
    const updateProducts = state.newEnvio.detalles.map((p) => {
      if (p.articulo._id !== item._id) return p;
      const newCantidad = p.enviado + 1;
      cantidadToUpdate = newCantidad;

      return { ...p, enviado: cantidadToUpdate };
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
      type: 'UpdateDetalles',
      payload: {
        newDetalle: updateProducts,
      },
    });
  };

  const removeArticuloFromDetalle = (detalle: IEnvioDetalle) => {
    const updateProducts = state.newEnvio.detalles.filter(
      (product) => product.articulo._id !== detalle.articulo._id
    );

    dispatch({
      type: 'UpdateDetalles',
      payload: {
        newDetalle: updateProducts,
      },
    });
  };

  const updateCantidad = (detalle: IEnvioDetalle, cantidad: number) => {
    let cantidadToUpdate = 0;
    let stockDisponible = 0;
    const updateProducts = state.newEnvio.detalles.map((p) => {
      if (p.articulo._id !== detalle.articulo._id) return p;

      const newCantidad = p.enviado + cantidad;
      cantidadToUpdate = newCantidad;

      stockDisponible = p.stockDisponible;

      return { ...p, enviado: newCantidad };
    });

    if (cantidadToUpdate > stockDisponible) {
      showSnackbar({
        message: `Se alcanzó el limite de stock disponible para articulo: ${detalle.articulo.descripcion}`,
        type: 'warning',
        show: true,
      });
      return;
    }

    dispatch({
      type: 'UpdateDetalles',
      payload: {
        newDetalle: updateProducts,
      },
    });
  };

  const resetEnvio = () => {
    dispatch({
      type: 'ResetEnvio',
    });
  };

  const realizarEnvio = async (): Promise<IEnpointResult> => {
    try {
      const result = await eireteApi.post(`/articulo-movimientos/enviar`, {
        ...state.newEnvio,
      });

      dispatch({
        type: 'EnvioRealizado',
        payload: result.data,
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

  const getCantidadTotalArticulos = (): Number => {
    let cantidad = 0;
    state.newEnvio.detalles.forEach((d) => {
      cantidad += d.enviado;
    });
    console.info('La cantidad de articulos es', cantidad);
    return cantidad;
  };

  return (
    <EnviosContext.Provider
      value={{
        ...state,
        getDetalle,
        setSucursalDestino,
        recibirEnvio,
        reponerStock,
        rechazarEnvio,
        setArticuloDetalle,
        removeArticuloFromDetalle,
        updateCantidad,
        resetEnvio,
        realizarEnvio,
        getCantidadTotalArticulos,
      }}
    >
      {children}
    </EnviosContext.Provider>
  );
};

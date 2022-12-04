import { createContext } from 'react';

import {
  IArticuloMovimiento,
  IArticuloStock,
  IEnpointResult,
} from '@core/interfaces';
import { IEnvioDetalle, IEnvioNuevo } from '@lib/interfaces';
import { ISucursalEnvio } from './EnviosProvider';

interface ContextProps {
  newEnvio: IEnvioNuevo;
  sucursalesPosibles: ISucursalEnvio[];
  envioRealizado?: IArticuloMovimiento;
  getDetalle: () => IEnvioDetalle[];
  setSucursalDestino: (_sucursalDestino: string) => void;

  rechazarEnvio: (_envio: IArticuloMovimiento) => Promise<IEnpointResult>;
  recibirEnvio: (
    _envio: IArticuloMovimiento,
    _codigo: string
  ) => Promise<IEnpointResult>;
  reponerStock: (_id: string) => Promise<IEnpointResult>;
  setArticuloDetalle: (_item: IArticuloStock, _stockDisponible: number) => void;
  removeArticuloFromDetalle: (_detalle: IEnvioDetalle) => void;
  updateCantidad: (_detalle: IEnvioDetalle, _cantidad: number) => void;
  resetEnvio: () => void;
  realizarEnvio: () => Promise<IEnpointResult>;
  getCantidadTotalArticulos: () => Number;
}

export const EnviosContext = createContext({} as ContextProps);

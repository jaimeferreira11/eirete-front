export interface ICategoriaMovimiento {
  _id: string;
  descripcion: string;
  estado: boolean;
  esGasto: boolean;
  esIngreso: boolean;
  visibleCaja: boolean;
  afectaArqueo: boolean;
  afectaEstadistica: boolean;
}

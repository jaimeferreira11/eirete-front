export interface ILineaArticulo {
  _id: string;
  descripcion: string;
  estado: boolean;
  familia: {
    _id: string;
    descripcion: string;
  };
}

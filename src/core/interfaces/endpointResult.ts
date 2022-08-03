export interface IEnpointResult {
  hasError: boolean;
  message?: string;
}

export interface IErrorMessage {
  msg: string;
  param: string;
  location: string;
  value: string;
}

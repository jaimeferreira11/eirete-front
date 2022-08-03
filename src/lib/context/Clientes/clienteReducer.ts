import { ClienteState } from './';

type ClienteType = { type: 'DefaultAcion' };

export const clienteReducer = (
  state: ClienteState,
  action: ClienteType
): ClienteState => {
  switch (action.type) {
    case 'DefaultAcion':
      return {
        ...state,
      };
    default:
      return state;
  }
};

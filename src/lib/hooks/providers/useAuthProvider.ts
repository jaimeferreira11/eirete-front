import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

export const useAuthProvider = () => {
  const providerState = useContext(AuthContext);

  return { ...providerState };
};

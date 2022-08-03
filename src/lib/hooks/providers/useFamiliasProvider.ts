import { FamiliasContext } from '@lib/context/FamiliaArticulos';
import { useContext } from 'react';


export const useFamiliasProvider = () => {
  const providerState = useContext(FamiliasContext);

  return { ...providerState };
};

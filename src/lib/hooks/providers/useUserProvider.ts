import { useContext } from 'react';

import { UserContext } from '@lib/context';

export const useUserProvider = () => {
  const providerState = useContext(UserContext);

  return { ...providerState };
};

import { useContext } from 'react';

import { SnackbarContext } from '@lib/context/Utils/Snackbar';

export const useSnackbarProvider = () => {
  const providerState = useContext(SnackbarContext);

  return { ...providerState };
};

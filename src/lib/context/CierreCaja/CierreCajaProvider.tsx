import { ICierreCaja } from '@core/interfaces';
import { useArqueoService } from '@core/services';
import axios from 'axios';
import { FC, PropsWithChildren } from 'react';
import { CierreCajaContext } from './';

export const CierreCajaProvider: FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const { saveArqueo } = useArqueoService();

  const saveArqueoHandler = async (
    newArqueo: ICierreCaja
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await saveArqueo(newArqueo);

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message || '',
        };
      }
      return {
        hasError: true,
        message: 'Something went wrong! 😵‍💫',
      };
    }
  };

  return (
    <CierreCajaContext.Provider
      value={{
        saveArqueoHandler,
      }}
    >
      {children}
    </CierreCajaContext.Provider>
  );
};

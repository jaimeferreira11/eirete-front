import dayjs from 'dayjs';

export const formatCurrency = (
  value: number,
  lang: string = 'es-PY',
  options: Intl.NumberFormatOptions | undefined = {
    style: 'currency',
    currency: 'PYG',
  }
): string => value.toLocaleString(lang, options);

export const formateDate = (value: string) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm');
};

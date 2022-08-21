export const formatCurrency = (
  value: number,
  lang: string = 'es-PY',
  options: Intl.NumberFormatOptions | undefined = {
    style: 'currency',
    currency: 'PYG',
  }
): string => value.toLocaleString(lang, options);

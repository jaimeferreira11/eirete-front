const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
    localePath: path.resolve('./src/locales'),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
};

const getPropertyOrder = require('stylelint-config-property-sort-order-smacss/generate');

/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'declaration-empty-line-before': null,
    'order/properties-order': [
      getPropertyOrder({ emptyLineBefore: 'always', noEmptyLineBetween: true }),
    ],
    'order/properties-alphabetical-order': null,
  },
};

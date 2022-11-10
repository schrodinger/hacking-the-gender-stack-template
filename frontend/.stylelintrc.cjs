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
    'max-nesting-depth': 3,
    'selector-class-pattern': [
      /^([a-z0-9\-]+|Mui[A-Z][a-zA-Z0-9\-]+)$/,
      {
        message: 'Selector should be written in lowercase with hyphens (selector-class-pattern)',
      },
    ],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'order/properties-order': [
      getPropertyOrder({ emptyLineBefore: 'always', noEmptyLineBetween: true }),
    ],
    'order/properties-alphabetical-order': null,
  },
};

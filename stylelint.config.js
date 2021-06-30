module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'function-parentheses-space-inside': 'never-single-line',
    'max-nesting-depth': [
      4,
      { ignore: ['blockless-at-rules', 'pseudo-classes'] },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ],
  },
}

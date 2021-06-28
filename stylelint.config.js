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
      3,
      { ignore: ['blockless-at-rules', 'pseudo-classes'] },
    ],
  },
}

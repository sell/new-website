module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: [2, 'single', { avoidEscape: true }],
    semi: [1, 'always'],
    'no-extra-semi': 'off',
    'comma-dangle': [2, 'only-multiline'],
    'space-before-function-paren': [2, 'never'],
    'arrow-parens': [2, 'always'],
  },
};

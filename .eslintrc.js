module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: [1, 'always'],
    'no-extra-semi': 'off',
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': [2, 'never'],
    'arrow-parens': [2, 'always'],
  },
};

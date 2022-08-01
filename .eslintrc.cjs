module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    // 'eslint:recommended',
    'airbnb-base',
    // "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // tsconfigRootDir: __dirname,
    // project: ['./tsconfig.json'],
    // extraFileExtensions: ['.svelte']
  },

  plugins: [
    '@typescript-eslint',
    // 'svelte3',
  ],

  // overrides: [
  //   {
  //     files: ['*.svelte'],
  //     processor: 'svelte3/svelte3',
  //   },
  // ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'lines-between-class-members': 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
  },

  settings: {
    // 'svelte3/typescript': require('typescript'), /* remove this line to develop outside svelte files, because eslint gets faster. */
    // 'svelte3/ignore-styles': () => true,
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

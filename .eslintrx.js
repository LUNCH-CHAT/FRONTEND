// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off', // React 17+에서는 필요 없음
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignores: ['node_modules', 'dist', 'build'], // ✅ ESLint 9+에 맞게 ignore 추가
};

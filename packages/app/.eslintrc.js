module.exports = require('@backstage/cli/config/eslint-factory')(__dirname, {
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
  },
});

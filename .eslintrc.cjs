module.exports = {
  "root": true,
  "ignorePatterns": [
    "**/node_modules/**",
    "**/libs/**",
    "**/lib.**",
    "**/*.d.ts",
  ],
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "rules": {},
};

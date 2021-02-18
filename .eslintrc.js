module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
    },
    rules: {
      "react/reace-in-jsx-scope": 'off',
      indent: ['error', 4],
      "react/jsx-indent": ["error", 4],
      "react/jsx-indent-props": ["error", 4],
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:@typescript-eslint/recommended",
      "plugin:eslint-comments/recommended",
      "plugin:promise/recommended",
      "prettier",
      "prettier/@typescript-eslint",
    ]
};
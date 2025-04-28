module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["prisma/**", "dist/", "node_modules/", "nx/", "turbo/"],
  rules: {
    "no-console": "off", // Example: Warn on console.log
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/ban-ts-comment": "off", // Allow ts-ignore comments
    "@typescript-eslint/no-explicit-any": "off", // Allow any type
    "@typescript-eslint/no-non-null-assertion": "off",

    "@typescript-eslint/no-empty-object-type": "off", // Ignore empty object type errors
    "@typescript-eslint/no-unused-expressions": "off", // Ignore unused expressions
    "@typescript-eslint/no-unsafe-function-type": "off", // Ignore warnings about Function type
    "no-empty-pattern": "off", // Ignore empty object pattern errors
    "@typescript-eslint/explicit-function-return-type": "off", // Allow inferred return types
    "@typescript-eslint/no-unsafe-function-type": "off", // Ignore function type errors
    "no-empty-pattern": "off", // Ignore empty object pattern errors
    "prefer-const": "off", // Ignore prefer-const suggestions
    "no-empty": "off", // Ignore empty block statement errors
    "no-case-declarations": "off", // Ignore case block declaration errors
    "no-constant-condition": "off",
    "jsx-a11y/alt-text": "off", // Disables alt-text rule
    "prettier/prettier": "off", // Ignores Prettier formatting errors
  },
};

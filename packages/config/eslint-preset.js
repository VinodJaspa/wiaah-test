
// eslint-disable-next-line no-undef
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["next", "plugin:prettier/recommended"],
  settings: {
    next: {
      rootDir: ["apps", "packages"], 
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",// ✅ React 17+ doesn't need React in scope
    "@next/next/no-html-link-for-pages": "off", // ✅ Ignores the Next.js rule
    "prettier/prettier": "error" ,// ✅ Enforce Prettier formatting
    "no-unsafe-optional-chaining": "off", // ✅ Ignores unsafe optional chainings
    "react-hooks/exhaustive-deps": "off", // 
    "jsx-a11y/alt-text": "off", // Disables alt-text rule

  },
};

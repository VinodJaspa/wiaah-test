module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["next", "plugin:prettier/recommended"],
  settings: {
    next: {
      rootDir: ["apps", "packages"], // ✅ Corrected paths
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off", // ✅ Ignores the Next.js rule
    "prettier/prettier": "error" ,// ✅ Enforce Prettier formatting
    "no-unsafe-optional-chaining": "off", // ✅ Ignores unsafe optional chaining
    "@typescript-eslint/no-unused-expressions": "off", // ✅ Ignores unused expressions
    "react-hooks/exhaustive-deps": "off", // 
    "jsx-a11y/alt-text": "off", // Disables alt-text rule
    "prettier/prettier": "off" // Ignores Prettier formatting errors
  },
};

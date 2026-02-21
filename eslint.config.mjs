// eslint.config.mjs

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,

  // Custom rules
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  // Ignore folders
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);

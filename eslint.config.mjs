import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Prebuilt static site published at the repo root for GitHub Pages
    // (see the deploy notes in README). These are generated artifacts.
    "_next/**",
    "_not-found/**",
    "404/**",
  ]),
]);

export default eslintConfig;

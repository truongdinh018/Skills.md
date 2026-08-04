import type { NextConfig } from "next";

// Static export (for GitHub Pages) is opt-in so that local `next dev`/`next
// build`/`next start` keep their normal behaviour. The deploy workflow sets
// BUILD_STATIC_EXPORT=true and PAGES_BASE_PATH=/<repo>.
const isStaticExport = process.env.BUILD_STATIC_EXPORT === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      // Project pages are served from https://<user>.github.io/<repo>/.
      basePath,
      // Ensures every route becomes <route>/index.html, which GitHub Pages
      // serves reliably without extra routing config.
      trailingSlash: true,
      // The Next.js image optimizer needs a server; disable it for export.
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;

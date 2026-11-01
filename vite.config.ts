import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Build only: the dev server needs external scripts and a socket, which this policy blocks.
const CSP = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; base-uri 'none'; form-action 'none'";

function contentSecurityPolicy(): Plugin {
  return {
    name: 'countersign-csp',
    apply: 'build',
    transformIndexHtml: html => html.replace('<meta charset="utf-8" />', `<meta charset="utf-8" />
    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
  };
}

export default defineConfig({
  plugins: [react(), contentSecurityPolicy(), viteSingleFile()],
  build: { target: 'es2022', sourcemap: false, modulePreload: { polyfill: false } },
  test: { include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'], environment: 'node' },
});

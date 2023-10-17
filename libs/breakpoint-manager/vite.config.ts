/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/breakpoint-manager',

  plugins: [
    svgr(),
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    entry: 'src/index.ts',
    name: 'breakpoint-manager',
    fileName: 'index',
    formats: ['es', 'cjs'],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    lib: {
      entry: 'src/index.ts',
      name: 'breakpoint-manager',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ["'react'", "'react-dom'", "'react/jsx-runtime'"],
    },
  },
});

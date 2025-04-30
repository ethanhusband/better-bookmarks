import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [
    svelte(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        newtab: 'src/entrypoints/newtab.html',
        popup: 'src/entrypoints/popup.html'
      },
      output: {
        entryFileNames: ({ name }) => `${name.split('/').pop()}.js`,
        chunkFileNames: ({ name }) => `${name.split('/').pop()}.js`,
        assetFileNames: ({ name }) => `${name?.split('/').pop()}`,
      },
    },
  },
})

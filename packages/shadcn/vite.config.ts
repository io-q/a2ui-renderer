import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        catalog: resolve(__dirname, 'src/catalog.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        '@a2ui-renderer/react',
        '@a2ui-renderer/stdlib',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
});

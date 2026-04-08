import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    type: 'module',
    setupFiles: './src/setupTests.ts',
    exclude: ['dist/**', 'node_modules/**']
  },
});

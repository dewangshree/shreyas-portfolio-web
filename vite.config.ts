import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: { proxy: { '/api': { target: env.VITE_API_PROXY_TARGET || 'http://localhost:5213', changeOrigin: true } } },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      globals: true,
      exclude: ['**/.kilo/**', '**/dist/**', '**/node_modules/**', '**/coverage/**'],
    },
  }
})

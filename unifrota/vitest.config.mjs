import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(rootDir, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    restoreMocks: true,
    include: ['test/**/*.spec.ts', 'test/**/*.test.ts'],
    exclude: ['build/**', 'coverage/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      enabled: false,
      reportsDirectory: './coverage',
      reporter: ['text', 'text-summary', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/main.ts'],
      thresholds: {
        branches: 80,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', '*.stories.ts']
  },
})
// jest.config.ts
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
}

export default createJestConfig(customJestConfig)

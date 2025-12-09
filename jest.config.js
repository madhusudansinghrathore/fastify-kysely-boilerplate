/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',
    testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    setupFilesAfterEnv: [],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: false,
    restoreMocks: false,
};

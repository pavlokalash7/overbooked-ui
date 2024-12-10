export default {
    preset: `ts-jest`,
    testEnvironment: `node`,
    verbose: true,
    setupFiles: [`<rootDir>/jest.setup.ts`],
    setupFilesAfterEnv: [],
    rootDir: `./`,
    moduleDirectories: [`node_modules`, `src`],
    modulePathIgnorePatterns: [`<rootDir>/build`],
    moduleNameMapper: {
        "^@/(.*)$": `<rootDir>/src/$1`,
    },
    collectCoverage: false,
};

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  rootDir: './tests/',
  testMatch: [
    '**/tests/components/*.spec.[jt]s?(x)',
    '**/tests/components/ui/*.spec.[jt]s?(x)',
    '**/tests/views/*.spec.[jt]s?(x)',
    '**/tests/*.spec.[jt]s?(x)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../src/$1'
  }
}

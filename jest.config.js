module.exports = {
    preset: 'ts-jest',  // Use ts-jest to handle TypeScript files
    testEnvironment: 'jsdom',  // Use jsdom environment to simulate browser-like behavior
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files using ts-jest
      '^.+\\.(js|jsx)$': 'babel-jest',  // Transform JavaScript files using babel-jest
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // Mock CSS imports
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)',  // Transform node_modules except axios (or other ES modules)
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],  // File extensions Jest should handle
  };
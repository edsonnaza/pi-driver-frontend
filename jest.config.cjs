module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts}"],
    coverageDirectory: "coverage",
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/__mocks__/styleMock.js",
        ".+\\.(jpeg|gif|svg|ico|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
        

    } 
    
};

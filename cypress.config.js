const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern : 'cypress/calix/smoke/*.js',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 6000,
  },
});

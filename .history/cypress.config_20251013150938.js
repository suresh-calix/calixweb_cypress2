const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  projectId: "sbfw1m",

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    env: {
      url: 'https://www.calix.com/'
    },
    reporterOptions: {
      reportDir: 'cypress/reports/html',
      overwrite: false,
      html: true,
      json: true
    },

    retries: {
      runMode: 1,
    },

    specPattern: 'cypress/calix/smoke/*.js',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
  },
});

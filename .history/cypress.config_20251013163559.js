const { defineConfig } = require("cypress");
const { exec } = require('child_process');

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  projectId: "nyhujg",

  e2e: {
    specPattern: 'cypress/**/*.js', 
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    env: {
    url: 'https://www.calix.com/',
    baseUrls: {
      dev: 'https://aem-web-dev.calix.com',
      stage: 'https://aem-web-stage.calix.com',
      prod: 'https://www.calix.com'
    },
    defaultEnv: 'dev'
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

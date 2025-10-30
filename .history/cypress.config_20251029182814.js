const { defineConfig } = require("cypress");
const { exec } = require('child_process');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  projectId: "nyhujg",

  env: {
    url: 'https://www.calix.com/',
    baseUrls: {
      dev: 'https://aem-web-dev.calix.com',
      stage: 'https://aem-web-stage.calix.com',
      prod: 'https://www.calix.com'
    },
    defaultEnv: 'prod'
  },

  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    specPattern: 'cypress/**/*.js',
    setupNodeEvents(on, config) {

   config.env.CALIX_USER_ID = process.env.CALIX_USER_ID;
      config.env.CALIX_PASSWORD = process.env.CALIX_PASSWORD;

      require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },

    retries: {
      runMode: 1,
    },

    specPattern: 'cypress/calix/smoke/*.js',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
  },
});
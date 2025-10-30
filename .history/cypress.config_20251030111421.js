const { defineConfig } = require("cypress");
const crypto = require('crypto');
const fs = require('fs');

// Decryption setup
const algorithm = 'aes-256-cbc';
const secret = 'your-strong-secret-key'; // Must match the one used in encryption
const key = crypto.scryptSync(secret, 'salt', 32);

function decrypt(encrypted, ivHex) {
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

let secureCreds = {};
try {
  secureCreds = JSON.parse(fs.readFileSync('./cypress/secure-creds.json', 'utf8'));
} catch (err) {
  console.warn('Warning: secure-creds.json not found or invalid.');
}

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
      try {
        config.env.CALIX_USER_ID = decrypt(secureCreds.CALIX_USER_ID.encrypted, secureCreds.CALIX_USER_ID.iv);
        config.env.CALIX_PASSWORD = decrypt(secureCreds.CALIX_PASSWORD.encrypted, secureCreds.CALIX_PASSWORD.iv);
      } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
      }

      require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    },

    retries: {
      runMode: 1,
    },

    specPattern: 'cypress/calix/smoke/*.js',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
  },
});
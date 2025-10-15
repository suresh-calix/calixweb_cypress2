/// <reference types="cypress" />

const redirectData = require('../../fixtures/redirects.json');

describe('Redirect Validation - Log Passed and Failed URLs', () => {
  const env = Cypress.env('env') || Cypress.env('defaultEnv');
  const baseUrl = Cypress.env('baseUrls')[env];

  redirectData.forEach(({ path, expectedRedirect }) => {
    it(`Check redirect for ${path}`, () => {
      cy.visit(baseUrl + path, { failOnStatusCode: false });

      cy.url().then((actualUrl) => {
        // Handle both relative and full URL cases
        const expectedUrl = expectedRedirect.startsWith('http')
          ? expectedRedirect
          : baseUrl + expectedRedirect;

        const status = actualUrl === expectedUrl ? '✅ Passed' : '❌ Failed';

        // Log result to Cypress runner and terminal
        cy.log(`${status}: ${path} → ${actualUrl} (Expected: ${expectedUrl})`);
        console.log(`${status}: ${path} → ${actualUrl} (Expected: ${expectedUrl})`);

        // Assertion for reporting
        expect(actualUrl, `Redirect for ${path}`).to.equal(expectedUrl);
      });
    });
  });
});

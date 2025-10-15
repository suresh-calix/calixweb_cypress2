// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('validatePageIsLoaded', () => {
  cy.document().should('exist');
  cy.get('body').should('be.visible');
});

// Cypress.Commands.add('ensureImagesLoading', () => {
//   cy.get('img').each(($img) => {
//     cy.wrap($img).should('be.visible');
//   });
// });

Cypress.Commands.add('executePercyIfConfigured', (snapshotName) => {
  if (Cypress.env('percyEnabled') !== false) {
    cy.percySnapshot(snapshotName);
  }
});

Cypress.Commands.add('logTest', (message) => {
  cy.task('log', message);
});

Cypress.Commands.add('ensureImagesLoading', () => {
  cy.get('img').each(($img, index) => {
    const imgSrc = $img.attr('src');
    const isVisible = Cypress.$($img).is(':visible');

    if (isVisible && imgSrc) {
      cy.wrap($img)
        .scrollIntoView({ block: 'center', inline: 'center' })
        .should(($el) => {
          return new Cypress.Promise((resolve, reject) => {
            let retries = 0;
            const maxRetries = 200; // 200 x 100ms = 20 seconds

            const checkLoaded = () => {
              if ($el[0].complete && $el[0].naturalWidth > 0) {
                resolve();
              } else if (retries++ < maxRetries) {
                setTimeout(checkLoaded, 100);
              } else {
                cy.log(`Image failed to load: ${imgSrc}`);
                reject(`Image failed to load: ${imgSrc}`);
              }
            };

            checkLoaded();
          });
        });
    } else {
      cy.log(`Skipping image [${index}]: ${imgSrc || 'no src'} - not visible or missing`);
    }
  });

Cypress.Commands.add('loginWithAuthJson', () => {
  cy.fixture('auth.json').then((auth) => {
    auth.cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly
      });
    });
  });
});

});



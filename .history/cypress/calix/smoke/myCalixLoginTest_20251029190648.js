describe('My Calix Login Test', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });



  it('should log in with valid credentials', () => {
     const userId = Cypress.env('CALIX_USER_ID');
const password = Cypress.env('CALIX_PASSWORD');

if (!userId || !password) {
  throw new Error('Missing CALIX_USER_ID or CALIX_PASSWORD in Cypress.env');
}
    cy.visit('https://www.calix.com/');

    cy.get('span.cmp-utility-nav__link--text')
      .contains('My Calix')
      .parents('a')
      .click();

    cy.url().should('include', 'my-calix');
    cy.get('#page-header > div > div.menu > div.navbar-login.buttons.mobileHide > a.login-link').click();
    cy.wait(3000);

    
cy.origin('https://calix.my.site.com', { args: { userId, password } }, ({ userId, password }) => {
      cy.get('#sfdc_username_container > div input').type(userId);
      cy.get('#sfdc_password_container > div input').type(password);
      cy.get('button.slds-button--brand.loginButton.uiButton--none.uiButton > span.label.bBody').click();
      cy.wait(10000);

    });

    // Now back on same-origin, continue without cy.origin
    cy.url().should('include', '/my-calix/home.html');
    cy.get('h3').should('contain', 'Welcome');
    cy.get('a.linkItem.cl_deep-blue[href="/my-calix/software-center.html"]').click();
    cy.get('h2').should('contain', 'Software Center');
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu a[href="/my-calix/doc-library.html"]').click();
    cy.get('h2').should('contain', 'Documentation Library');
  });
});
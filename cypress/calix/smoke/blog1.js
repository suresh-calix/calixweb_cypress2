
import BasePage from "../../pageObjects/BasePage"


const blogPage = require('../../pageObjects/BlogPage1');


describe('Calix Blog Page Test Cases', () => {
  const basePage = new BasePage();

  it('Navigates to Blog Page and applies filters', () => {
    cy.visit("https://aem-web-dev.calix.com/");

    cy.get(blogPage.resourcesTab)
      .contains('Resources')
      .should('be.visible')
      .click({ force: true });

    cy.get('.cmp-navigation-section-simple__linkListCol')
      .contains('.cmp-navigation-section-simple__linkListCol__heading', 'Perspectives')
      .parent()
      .find('a[href="/blog.html"]')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.contains('Filter by')
      .scrollIntoView()
      .should('be.visible');

    // Wait for Role dropdown and select "General Management"
  basePage.dropdown('#Role_filter','blogs:filter/role/general-management');

    // cy.get('#Role_filter', { timeout: 10000 })
    //   .scrollIntoView()
    //   .should('be.visible')
    //   .find('option')
    //   .should('contain.text', 'General Management');

    // cy.get('#Role_filter')
    //   .select('blogs:filter/role/general-management', { force: true })
    //   .should('have.value', 'blogs:filter/role/general-management');

    // Wait for Provider Type dropdown and select "Municipalities"
     basePage.dropdown('#Provider\\ Type_filter','blogs:filter/provider-type/municipalities');
  //   cy.get('#Provider\\ Type_filter', { timeout: 10000 })
  //     .scrollIntoView()
  //     .should('be.visible')
  //     .find('option')
  //     .should('contain.text', 'Municipalities');

  //   cy.get('#Provider\\ Type_filter')
  //     .select('blogs:filter/provider-type/municipalities', { force: true })
  //     .should('have.value', 'blogs:filter/provider-type/municipalities');
  });

});

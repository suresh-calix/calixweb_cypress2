import Resources from "./Resources";

class HomePage {

    getMyCalixLink() {
        return cy.get('.cmp-utility-nav__link--text');
    }

    getTitle() {
        return cy.title();
    }

    getSolutions() {
        return cy.get('#accordion-navigation-panel-multi-1bbc666e74-button > .cmp-accordion__title');
    }

    getProductsAndServices() {
        return cy.get('#accordion-navigation-panel-multi-022ec3b8bd-button > .cmp-accordion__title');
    }

    getMarketInsights() {
        return cy.get('#accordion-navigation-panel-82643c92e4-item-button > .cmp-accordion__title');
    }

    getResources() {
        return cy.contains('.cmp-accordion__title', 'Resources').should('be.visible');
    }

    getCompany() {
        return cy.get('#accordion-navigation-panel-2f1d76fa2b-item-button > .cmp-accordion__title');
    }

    clickResourcesLink() {
        this.getResources().click();
        return new Resources();
    }

}

export default HomePage;

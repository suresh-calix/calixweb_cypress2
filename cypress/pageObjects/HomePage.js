class HomePage {

    gotoURL(url) {
        cy.visit(url);
    }

    getMyCalixLink() {
        return cy.get('.cmp-utility-nav__link--text')
    }

    getTitle() {
        return cy.title();
    }

}

export default HomePage;

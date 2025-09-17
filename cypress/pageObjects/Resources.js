import BlogPage from "./BlogPage";

class Resources {

    getBlogLink() {
        return cy.get('#accordion-navigation-panel-63657729d2-item-panel > .cmp-accordion__panel-inner > .cmp-accordion__panel-contents > .cmp-navigation-section-simple > .cmp-navigation-section-simple__wrapper > .cmp-navigation-section-simple__links > .cmp-navigation-section-simple__linkList > :nth-child(3) > .cmp-navigation-section-simple__linkListCol__list > :nth-child(1) > a')
    }

    clickBlogLink() {
        cy.log('Clicking Blog link');
        this.getBlogLink().click()
        return new BlogPage();
    }

}

export default Resources;

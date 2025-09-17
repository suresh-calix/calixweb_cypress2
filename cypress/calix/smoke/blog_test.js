import BasePage from "../../pageObjects/BasePage"


describe('Calix Blog tests', function () {

    const basePage = new BasePage()
    const pageTitle = "Calix Blog | Blog Posts By Broadband Professionals | Calix"


    before(function () {
        cy.fixture('data').then(function (data) {
            this.data = data
        })
    })

    it('Verify the blog page', function () {
        const homePage = basePage.gotoURL(Cypress.env('url'))
        const resources = homePage.clickResourcesLink()
        resources.clickBlogLink()
        basePage.getPageTitle().should('eq', pageTitle)

    })

    it('Test to find the broken links in blog page', function () {
        const homePage = basePage.gotoURL(Cypress.env('url'))
        const resources = homePage.clickResourcesLink()
        resources.clickBlogLink()
        basePage.copyHrefToFile()
        //basePage.findBrokenLinks()

    })

    it.only('Test to verify the invalid hrefs', function () {
        const homePage = basePage.gotoURL(Cypress.env('url'))
        cy.wait(3000)
        const resources = homePage.clickResourcesLink()
        cy.wait(3000)
        const blogPage = resources.clickBlogLink()
        cy.wait(3000)
        basePage.findEmptyOrInvalidHrefs();
        cy.wait(3000)
        basePage.getPageTitle().should('eq', pageTitle)

    })

     it.only('Test to verify the meata data of blogs', function () {
        const homePage = basePage.gotoURL(Cypress.env('url'))
        const resources = homePage.clickResourcesLink()
        const blogPage = resources.clickBlogLink()
        basePage.getPageTitle().should('eq', pageTitle)
        blogPage.verifyMetaDataForBlogs()
    })
})
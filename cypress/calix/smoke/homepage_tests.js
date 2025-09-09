
import HomePage from "../../pageObjects/homePage";
describe('home page validations', function () {

    const homePage = new HomePage()

    before(function () {
        cy.fixture('data').then(function (data) {
            this.data = data
        })
    })

    it('verify calix home page', function () {

        //homePage.gotoURL(this.data.url)
        homePage.gotoURL(Cypress.env('url'))
        const expectedText = 'Calix | Calix Managed Services | Calix Broadband Platform | Calix Inc'
        homePage.getTitle().then((title) => {
            expect(title).to.equal(expectedText)
            cy.title().should('eq', expectedText)
        })

    })

    it('verify calix home page', function () {

        //homePage.gotoURL(this.data.url)
        homePage.gotoURL(Cypress.env('url'))
        const expectedText = 'Calix | Calcix Managed Services | Calix Broadband Platform | Calix Inc'
        homePage.getTitle().then((title) => {
            expect(title).to.equal(expectedText)
            cy.title().should('eq', expectedText)
        })

    })
})
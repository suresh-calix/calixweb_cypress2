import BasePage from "../../pageObjects/BasePage"
const basePage=new BasePage();


describe('Calix Visual Test', () => {
  beforeEach(function () {
    cy.fixture('visualUrls.json').then((data) => {
      cy.wrap(data.urls).as('urls');
    });
  });

  it('Execute visual snapshot capture with Percy', function () {
    let i = 0;
    cy.get('@urls').then((urls) => {
      expect(urls).to.be.an('array').that.is.not.empty;
      urls.forEach((url) => {
        const [siteUrl, label] = url.split('||');
        cy.visit(siteUrl, {
          failOnStatusCode: false,
          timeout: 180000,
          headers: {
            "Accept-Encoding": "gzip, deflate",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
          }
        });

        // Initial wait for page to settle
       // cy.wait(5000);

        // Scroll to bottom and top to trigger lazy loading
        cy.scrollTo('bottom');
        cy.wait(3000);
        cy.scrollTo('top');
        
        // Wait for images to load in the
       basePage.waitForPageLoad;
        cy.validatePageIsLoaded();
        cy.ensureImagesLoading();
        // Final buffer before snapshot
        cy.wait(3000);
        cy.executePercyIfConfigured(label + " " + i);
        i++;
        cy.logTest("Completed page: " + url);
      });
    });
  });
});

import HomePage from "./homePage";

class BasePage {
    dropdown(selector, value) {
    cy.get('body').then($body => {
      if ($body.find(selector).length) {
        cy.get(selector).select(value, { force: true });
        cy.log(`Selected dropdown: ${selector} with value: ${value}`);
      } else {
        cy.log(`Dropdown not found: ${selector}`);
      }
    });
}

    gotoURL(url) {
        cy.visit(url)
        return new HomePage()
    }

    getPageTitle() {
        return cy.title()
    }

    veryTheLinksAreNotEmpty() {
        cy.get('a[href]').each(($el) => {
            const href = $el.attr('href');
            expect(href).to.be.a('string').and.not.be.empty;

        });
    }


    copyHrefToFile() {
        cy.get('a[href]').then(($links) => {
            const hrefs = [];
            $links.each((_, el) => {
                const href = el.getAttribute('href');
                if (href) hrefs.push(href);
            });

            // Write to file
            cy.writeFile('cypress/outputs/hrefs.json', hrefs);
        });
    }

    findBrokenLinks() {

                const brokenLinks = [];

                cy.get('a[href]').each(($el) => {
                    const href = $el.prop('href');

                    if (href.startsWith('mailto:') || href.startsWith('javascript:')) return;

                    cy.request({
                        url: href,
                        failOnStatusCode: false
                    }).then((response) => {
                        if (response.status >= 400) {
                            brokenLinks.push(href);
                        }
                    });
                }).then(() => {
                    cy.writeFile('cypress/outputs/broken_links.json', brokenLinks);
                });

    }

    findEmptyOrInvalidHrefs() {

        const invalidHrefs = [];

        cy.get('a[href]').each(($el) => {
            const href = $el.attr('href');

            if (
                href &&
                !href.endsWith('.html') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('javascript:')
            ) {
                invalidHrefs.push(href);
            }
        }).then(() => {
            cy.writeFile('cypress/outputs/invalid_hrefs.json', invalidHrefs);
        });
    }
    

}


export default BasePage;

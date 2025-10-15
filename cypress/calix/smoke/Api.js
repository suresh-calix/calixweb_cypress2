describe('Calix Locations Page - View Map Link Check', () => {
  it('should validate the first View Map link returns 200', () => {
    cy.visit('https://www.calix.com/about/contact/locations.html');

    cy.contains('a', 'View map') // lowercase 'map'
      .should('have.attr', 'href')
      .then((mapUrl) => {
        cy.log(`Validating map URL: ${mapUrl}`);

        cy.request({
          url: mapUrl,
          followRedirect: true,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});

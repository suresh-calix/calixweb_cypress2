describe('Calix smoke tests', function () {

  before(function () {
    cy.fixture('data').then(function (data) {
      this.data = data
      console.log(data.firstName)
      console.log('Example test')
    })

  })


  it('verify calix home page', () => {

    cy.visit('https://www.calix.com/')
    cy.get('#studio-search-widget-search-btn').click()
    cy.get('#studio-search-widget-search-input').type('blogs')
    cy.get('#studio-search-widget-small-search-btn').click()
    cy.get('#searchstax-search-order-select').select('Most Recent')
    //cy.get('.searchstax-facet-value-container').contains('2025')

    cy.contains('.searchstax-facet-value-label', '2025')
      .parents('.searchstax-facet-label')
      .find('.searchstax-facet-input-checkbox')
      .check({ force: true });

    cy.contains('.searchstax-facet-value-label', '2025')
      .siblings('.searchstax-facet-value-count')
      .should('contain', '(3)');

  })

})
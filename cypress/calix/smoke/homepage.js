describe('home page validations', function(){


it('verify calix home page', () => {

cy.visit('https://www.calix.com/')

cy.get('h1').then(($el) => {
  const actualText = $el.text().replace(/\s+/g, ' ').trim();
  const expectedText = 'Calix helps broadband service providers simplify, innovate and grow';
  expect(actualText).to.equal(expectedText);

})

})

})
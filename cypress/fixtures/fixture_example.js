describe('Print Fixture Data Example', function() {
  it('should load and print user data from fixture', () => {
    cy.fixture('userData').then((data) => {
      console.log('First Name:', data.firstName);
      console.log('Last Name:', data.lastName);
      console.log('Role:', data.role);
    });
  });
});

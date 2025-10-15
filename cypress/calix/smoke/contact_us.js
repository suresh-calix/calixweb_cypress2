// Test for calix.com — verifies iframe presence
describe('Calix Contact Page', () => {
  it('loads the contact page and verifies iframe', () => {
    cy.log('Visiting Calix Contact Us page');
    cy.visit('https://aem-web-dev.calix.com/forms/contact-us.html');

    cy.log('Checking for iframe presence');
    cy.get('iframe#hero-form-iframe').should('exist');
  });
});

// Test for iframe content — fills and submits the form
describe('Calix Form Iframe', () => {
  it('fills the entire form with test data and submits', () => {
    cy.log('Visiting Calix form iframe directly');
    cy.visit('https://communications.calix.com/l/2172/2023-11-07/dbtdcb');

    // Utility functions
    const inputField = (selector, value) => {
      cy.get('body').then($body => {
        if ($body.find(selector).length) {
          cy.get(selector).type(value, { force: true });
          cy.log(`Filled input field: ${selector} with value: ${value}`);
        } else {
          cy.log(`Input field not found: ${selector}`);
        }
      });
    };

    const dropdown = (selector, value) => {
      cy.get('body').then($body => {
        if ($body.find(selector).length) {
          cy.get(selector).select(value, { force: true });
          cy.log(`Selected dropdown: ${selector} with value: ${value}`);
        } else {
          cy.log(`Dropdown not found: ${selector}`);
        }
      });
    };

    const checkbox = (selector) => {
      cy.get('body').then($body => {
        if ($body.find(selector).length) {
          cy.get(selector).check({ force: true });
          cy.log(`Checked checkbox: ${selector}`);
        } else {
          cy.log(`Checkbox not found: ${selector}`);
        }
      });
    };

    // Fill form fields
    dropdown('select#2172_352468pi_2172_352468', '5378781'); // Nature of Inquiry
    dropdown('select#2172_361374pi_2172_361374', '5378817'); // Support Request

    inputField('input[name="2172_345600pi_2172_345600"]', 'Test1'); // First Name
    inputField('input[name="2172_345603pi_2172_345603"]', 'Test2'); // Last Name
    inputField('input[name="2172_345606pi_2172_345606"]', 'Calix QA Team'); // Company
    inputField('input[name="2172_345609pi_2172_345609"]', 'testing@example.com'); // Email

    checkbox('input[type="checkbox"]'); // Email Updates

    inputField('input[name="2172_345615pi_2172_345615"]', 'San Jose'); // City
    dropdown('select#2172_345618pi_2172_345618', '5142669'); // Country
    dropdown('select#2172_345621pi_2172_345621', '5143545'); // State/Province

    inputField('textarea[name="2172_345624pi_2172_345624"]', 'This is a test message for Calix QA testing automation.'); // Message

    // Submit the form
    cy.get('input[type="submit"]').click({ force: true });
    cy.log('Form submitted');

    // Verify success message
    cy.contains('Thank you for your submission!').should('be.visible');
    cy.log('Success message verified');
  });
});

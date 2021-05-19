import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I open the users list page', () => {
  // Intercept the request to the API and return the fake users inside cypress/fixtures/users.json
  // Cypress knows to look for fixtures inside the cypress/fixtures directory
  cy.intercept(
    'GET', 'https://jsonplaceholder.typicode.com/users',
    { fixture: 'users.json' }
  );
  cy.visit('localhost:3000/');
});

Given('I open the users list page when an error occurs', () => {
  // Intercept the request to the API and return an error
  cy.intercept(
    'GET', 'https://jsonplaceholder.typicode.com/users',
    { statusCode: 404, body: '404 Not Found!'}
  );
  cy.visit('localhost:3000/');
});

Then('I see the loading message', () => {
  cy.contains('Loading...').should('be.visible');
});

// This step takes in a string as a parameter and matches it to any string after the "with the text" phrase inside the feature file
And(`I see the error message with the text {string}`, errorMessage => {
  cy.contains(errorMessage).should('exist');
});

// This step takes in a data table as a parameter
// Columns and rows are separated by | (pipes).
// The data table can have multiple rows and columns
And('I see the list of users with data', data => {
  // Slice(1) is used because the table contains a header in the feature file
  // This ignores the header
  data.rawTable.slice(1).forEach(row => {
    cy.contains(row.toString()).should('be.visible');
  });
});

And('the page should not have any accessibility violations', () => {
  cy.injectAxe();
  // Check for violations of certain accessibility standards
  // The impact level and standard type to fail at can be configured. See https://www.npmjs.com/package/cypress-axe#user-content-cychecka11y
  cy.checkA11y();
});

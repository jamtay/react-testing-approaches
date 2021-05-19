describe('UsersList with stubbing', () => {

  it('should display a list of fake users', () => {
    // Intercept the request to the API and return the fake users inside cypress/fixtures/users.json
    // Cypress knows to look for fixtures inside the cypress/fixtures directory
    cy.intercept(
      'GET', 'https://jsonplaceholder.typicode.com/users',
      { fixture: 'users.json' }
    );
    cy.visit('localhost:3000/');

    cy.contains('Users list').should('be.visible');
    cy.contains('Name: First Name, Email: myemail1@email.com, Website: www.website.com').should('be.visible');
    cy.contains('Name: Second Name, Email: myemai21@email.com, Website: www.website2.com').should('be.visible');
    cy.contains('Name: Third Name, Email: myemail3@email.com, Website: www.website3.com').should('be.visible');
  });

  it('should display an error message if an error occurs', () => {
    // Intercept the request to the API and return an error
    // Intercepting gives us more flexibility with testing the UI based on certain API responses
    // It might be difficult to force the API to throw an error usually, but here it is simple using intercept
    cy.intercept(
      'GET', 'https://jsonplaceholder.typicode.com/users',
      { statusCode: 404, body: '404 Not Found!'}
    );
    cy.visit('localhost:3000/');

    cy.contains('Error!').should('exist');
    cy.contains('Users list').should('not.exist');
    cy.contains('Name: First Name, Email: myemail1@email.com, Website: www.website.com').should('not.exist');
  });

});

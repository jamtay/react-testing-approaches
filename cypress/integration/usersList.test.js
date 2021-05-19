// The same syntax of "describe", "it", "beforeEach" etc can be used in cypress test files as with the jest unit tests
describe('UsersList without stubbing', () => {

  // Every test needs to visit the application. Add this to a before each step so it is executed before each "it"
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });

  it('initially displays the loading message', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('displays the list of users', () => {
    cy.contains('Users list').should('be.visible');
    cy.contains('Name: Leanne Graham, Email: Sincere@april.biz, Website: www.hildegard.org').should('be.visible');
  });

});

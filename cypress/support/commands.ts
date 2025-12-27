// ***********************************************
// Custom commands for DataShare E2E tests
// ***********************************************

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/upload');
  });
});

// Upload file command
Cypress.Commands.add('uploadFile', (fileName: string, title: string, description?: string) => {
  cy.visit('/upload');
  cy.get('input[type="file"]').selectFile(fileName);
  cy.get('#title').type(title);
  if (description) {
    cy.get('#description').type(description);
  }
  cy.get('button[type="submit"]').click();
  cy.get('.alert-success').should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      uploadFile(fileName: string, title: string, description?: string): Chainable<void>;
    }
  }
}

export {};

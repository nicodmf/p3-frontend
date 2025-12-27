describe('US04 - Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page with correct elements', () => {
    cy.get('h2').should('contain', 'Se connecter');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  it('should display correct labels and placeholders', () => {
    cy.get('label[for="email"]').should('contain', 'Email');
    cy.get('label[for="password"]').should('contain', 'Mot de passe');

    cy.get('#email').should('have.attr', 'placeholder', 'Saisissez votre email');
    cy.get('#password').should('have.attr', 'placeholder', 'Saisissez votre mot de passe');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });

  it('should show error for invalid email format', () => {
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });

  it('should navigate to register page when clicking footer link', () => {
    cy.get('.footer-link').click();
    cy.url().should('include', '/register');
  });

  it('should have header with DataShare logo', () => {
    cy.get('.header').should('be.visible');
    cy.get('.logo').should('contain', 'DataShare');
  });
});

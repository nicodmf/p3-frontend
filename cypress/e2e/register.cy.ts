describe('US03 - Register', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register page with correct elements', () => {
    cy.get('h2').should('contain', 'Créer un compte');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#confirmPassword').should('be.visible');
  });

  it('should display correct labels and placeholders', () => {
    cy.get('label[for="email"]').should('contain', 'Email');
    cy.get('label[for="password"]').should('contain', 'Mot de passe');
    cy.get('label[for="confirmPassword"]').should('contain', 'Vérification du mot de passe');

    cy.get('#email').should('have.attr', 'placeholder', 'Saisissez votre email');
    cy.get('#password').should('have.attr', 'placeholder', 'Saisissez votre mot de passe');
    cy.get('#confirmPassword').should('have.attr', 'placeholder', 'Saisissez le à nouveau');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('different');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', 'mots de passe');
  });

  it('should navigate to login page when clicking footer link', () => {
    cy.get('.footer-link').click();
    cy.url().should('include', '/login');
  });

  it('should have header with DataShare logo and login button', () => {
    cy.get('.header').should('be.visible');
    cy.get('.logo').should('contain', 'DataShare');
    cy.get('.btn-login').should('contain', 'Se connecter');
  });
});

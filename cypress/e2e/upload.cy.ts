describe('US01 - Upload', () => {
  beforeEach(() => {
    cy.visit('/upload');
  });

  it('should display upload page with correct title', () => {
    cy.get('h2').should('contain', 'Ajouter un fichier');
  });

  it('should display file selector when no file is selected', () => {
    cy.get('.file-selector').should('be.visible');
    cy.get('.file-label').should('contain', 'Fichier');
    cy.get('.file-button').should('contain', 'Choisir un fichier');
    cy.get('.file-text').should('contain', 'Aucun fichier choisi');
  });

  it('should display form fields', () => {
    cy.get('input[type="password"]').should('exist');
    cy.get('select').should('exist');
  });

  it('should display correct labels and placeholders', () => {
    cy.get('.input-label').contains('Mot de passe').should('be.visible');
    cy.get('.select-label').contains('Expiration').should('be.visible');

    cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Optionnel');
  });

  it('should have default expiration value of 1 day', () => {
    cy.get('select').should('have.value', '1');
  });

  it('should display file info when file is selected', () => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('test content'),
      fileName: 'test-image.jpg',
      mimeType: 'image/jpeg'
    }, { force: true });

    cy.get('.file-selected').should('be.visible');
    cy.get('.file-name').should('contain', 'test-image.jpg');
    cy.get('.file-size').should('exist');
    cy.get('.change-button').should('contain', 'Changer');
  });

  it('should show validation error for missing file', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible').and('contain', 'Veuillez sélectionner un fichier');
  });

  it('should allow changing file', () => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('test content'),
      fileName: 'first.jpg',
      mimeType: 'image/jpeg'
    }, { force: true });

    cy.get('.file-name').should('contain', 'first.jpg');

    cy.get('.change-button').click();
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('new content'),
      fileName: 'second.jpg',
      mimeType: 'image/jpeg'
    }, { force: true });

    cy.get('.file-name').should('contain', 'second.jpg');
  });

  it('should allow optional password field', () => {
    cy.get('input[type="password"]').should('not.have.attr', 'required');
    cy.get('input[type="password"]').type('test123');
    cy.get('input[type="password"]').should('have.value', 'test123');
  });

  it('should allow selecting expiration duration', () => {
    cy.get('select').select('Une semaine');
    cy.get('select').should('have.value', '7');

    cy.get('select').select('Deux jours');
    cy.get('select').should('have.value', '2');
  });
});

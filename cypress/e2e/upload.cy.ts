describe('US01 - Upload', () => {
  beforeEach(() => {
    cy.visit('/upload');
  });

  it('should display upload page with correct elements', () => {
    cy.get('h2').should('contain', 'Téléverser un fichier');
    cy.get('.subtitle').should('contain', 'Partagez vos fichiers');
  });

  it('should display file input and form fields', () => {
    cy.get('input[type="file"]').should('be.visible');
    cy.get('#title').should('be.visible');
    cy.get('#description').should('be.visible');
  });

  it('should display correct labels and placeholders', () => {
    cy.get('label[for="title"]').should('contain', 'Titre');
    cy.get('label[for="description"]').should('contain', 'Description');

    cy.get('#title').should('have.attr', 'placeholder', 'Titre du fichier');
    cy.get('#description').should('have.attr', 'placeholder', 'Description optionnelle');
  });

  it('should show validation error for missing file', () => {
    cy.get('#title').type('Test file');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });

  it('should show validation error for missing title', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });

  it('should display selected file name after selection', () => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('test content'),
      fileName: 'test.txt',
      mimeType: 'text/plain'
    });
    cy.get('.file-name').should('contain', 'test.txt');
  });
});

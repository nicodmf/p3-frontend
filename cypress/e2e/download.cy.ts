describe('US02 - Download', () => {
  it('should display download page with file info', () => {
    cy.visit('/download/test-file-id');
    cy.get('h2').should('contain', 'Télécharger');
    cy.get('.subtitle').should('contain', 'Téléchargez le fichier partagé');
  });

  it('should display loading state initially', () => {
    cy.visit('/download/test-file-id');
    cy.get('.loading').should('be.visible');
    cy.get('.spinner').should('be.visible');
  });

  it('should display error for invalid file ID', () => {
    cy.visit('/download/invalid-id');
    cy.get('.error-message').should('be.visible');
    cy.get('.error-message').should('contain', 'Fichier non trouvé');
  });

  it('should display file information when available', () => {
    cy.visit('/download/valid-file-id');
    cy.get('.file-info').should('be.visible');
    cy.get('.file-title').should('be.visible');
    cy.get('.file-size').should('be.visible');
    cy.get('.btn-download').should('be.visible');
  });

  it('should have download button', () => {
    cy.visit('/download/valid-file-id');
    cy.get('.btn-download').should('contain', 'Télécharger');
  });

  it('should display file icon', () => {
    cy.visit('/download/valid-file-id');
    cy.get('.file-icon').should('be.visible');
  });
});

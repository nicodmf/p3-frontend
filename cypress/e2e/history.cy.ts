describe('US05 - File History and US06 - Delete File', () => {
  beforeEach(() => {
    cy.visit('/history');
  });

  it('should display history page with correct elements', () => {
    cy.get('h2').should('contain', 'Historique des fichiers');
    cy.get('.subtitle').should('contain', 'Consultez vos fichiers téléversés');
  });

  it('should show loading state initially', () => {
    cy.get('.loading').should('be.visible');
    cy.get('.spinner').should('be.visible');
  });

  it('should display empty state when no files', () => {
    cy.get('.empty-state').should('contain', 'Aucun fichier téléversé');
    cy.get('.empty-state .btn').should('contain', 'Téléverser un fichier');
    cy.get('.empty-state .btn').click();
    cy.url().should('include', '/upload');
  });

  it('should display file list when files exist', () => {
    cy.get('.file-item').should('be.visible');
    cy.get('.file-icon').should('be.visible');
    cy.get('.file-title').should('be.visible');
    cy.get('.file-meta').should('be.visible');
    cy.get('.btn-download').should('be.visible');
    cy.get('.btn-delete').should('be.visible');
  });

  it('should navigate to download page when clicking download button', () => {
    cy.get('.btn-download').first().click();
    cy.url().should('include', '/download/');
  });

  it('should delete file when clicking delete button', () => {
    cy.get('.btn-delete').first().click();

    // Confirmation dialog
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Êtes-vous sûr de vouloir supprimer ce fichier ?');
      return true;
    });

    cy.get('.file-item').should('have.length', 0);
  });

  it('should not delete file when canceling confirmation', () => {
    cy.get('.btn-delete').first().click();

    cy.on('window:confirm', () => false);

    cy.get('.file-item').should('have.length.at.least', 1);
  });

  it('should display file metadata correctly', () => {
    cy.get('.file-item').first().within(() => {
      cy.get('.file-title').should('not.be.empty');
      cy.get('.file-name').should('not.be.empty');
      cy.get('.file-size').should('not.be.empty');
      cy.get('.file-date').should('not.be.empty');
    });
  });
});

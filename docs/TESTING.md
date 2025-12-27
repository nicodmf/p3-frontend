# Guide de Test - DataShare Frontend

## Vue d'ensemble

Ce document décrit la stratégie de test pour l'application DataShare Frontend, incluant les tests unitaires et les tests E2E.

## Stack de test

- **Karma** - Runner de tests
- **Jasmine** - Framework de test unitaire
- **Cypress** - Framework de test E2E

## Tests unitaires

### Configuration

Les tests unitaires sont configurés dans :
- `karma.conf.js` - Configuration Karma
- `src/test.ts` - Point d'entrée des tests

### Exécution

```bash
# Lancer les tests en mode watch
npm test

# Lancer les tests une seule fois
npm test -- --watch=false

# Générer un rapport de couverture
npm test -- --code-coverage
```

### Stratégie de test

#### 1. Services

**AuthService**
- ✅ Inscription avec données valides
- ✅ Inscription avec données invalides
- ✅ Connexion avec identifiants corrects
- ✅ Connexion avec identifiants incorrects
- ✅ Déconnexion
- ✅ Vérification authentification
- ✅ Gestion du token JWT

**UploadService**
- ✅ Téléversement de fichier
- ✅ Gestion des erreurs
- ✅ Headers d'authentification

**DownloadService**
- ✅ Récupération informations fichier
- ✅ Téléchargement fichier
- ✅ Gestion des erreurs (fichier non trouvé)

**HistoryService**
- ✅ Récupération de l'historique
- ✅ Suppression de fichier
- ✅ Gestion des erreurs

#### 2. Composants

**RegisterComponent**
- ✅ Validation du formulaire
- ✅ Messages d'erreur
- ✅ Navigation vers la page de connexion

**LoginComponent**
- ✅ Validation du formulaire
- ✅ Messages d'erreur
- ✅ Navigation vers la page d'inscription

**UploadComponent**
- ✅ Sélection de fichier
- ✅ Validation des champs
- ✅ Téléversement avec succès
- ✅ Gestion des erreurs

**DownloadComponent**
- ✅ Affichage des informations
- ✅ Gestion du chargement
- ✅ Téléchargement du fichier

**HistoryComponent**
- ✅ Affichage de la liste
- ✅ État vide (aucun fichier)
- ✅ Suppression avec confirmation
- ✅ Navigation vers téléchargement

## Tests E2E avec Cypress

### Configuration

- `cypress.config.ts` - Configuration principale
- `cypress/e2e/` - Tests E2E
- `cypress/support/` - Commandes et configuration globale

### Exécution

```bash
# Interface graphique Cypress
npm run e2e

# Exécution en mode headless
npm run e2e:run

# Spécifier un navigateur
npm run e2e -- --browser chrome
```

### Scénarios de test

#### US03 - Inscription

```typescript
describe('US03 - Register', () => {
  it('should display register page with correct elements', () => {
    cy.visit('/register');
    cy.get('h2').should('contain', 'Créer un compte');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#confirmPassword').should('be.visible');
  });
});
```

#### US04 - Connexion

```typescript
describe('US04 - Login', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/upload');
  });
});
```

#### US01 - Téléversement

```typescript
describe('US01 - Upload', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
  });

  it('should upload a file', () => {
    cy.visit('/upload');
    cy.get('input[type="file"]').selectFile('test.txt');
    cy.get('#title').type('Test File');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-success').should('be.visible');
  });
});
```

#### US02 - Téléchargement

```typescript
describe('US02 - Download', () => {
  it('should download file via public link', () => {
    cy.visit('/download/test-file-id');
    cy.get('.file-info').should('be.visible');
    cy.get('.btn-download').click();
  });
});
```

#### US05/US06 - Historique et Suppression

```typescript
describe('US05 - File History and US06 - Delete', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
    cy.visit('/history');
  });

  it('should display file list', () => {
    cy.get('.file-item').should('be.visible');
  });

  it('should delete file with confirmation', () => {
    cy.get('.btn-delete').first().click();
    cy.on('window:confirm', () => true);
    cy.get('.file-item').should('have.length', 0);
  });
});
```

## Couverture de code

### Objectifs

- **Lignes** : > 80%
- **Branches** : > 75%
- **Fonctions** : > 80%
- **Instructions** : > 80%

### Rapport

```bash
npm test -- --code-coverage
```

Le rapport sera généré dans `coverage/index.html`.

## Dépannage

### Tests échoués

1. Vérifiez les dépendances : `npm install`
2. Lancez en mode watch : `npm test`
3. Consultez les logs dans la console

### Cypress ne démarre pas

1. Vérifiez l'installation : `npx cypress verify`
2. Démarrez en mode verbose : `npx cypress open --verbose`
3. Vérifiez la configuration dans `cypress.config.ts`

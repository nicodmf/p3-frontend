# Guide de Maintenance - DataShare Frontend

## Vue d'ensemble

Ce document fournit les informations nécessaires pour la maintenance et l'évolution de l'application DataShare Frontend.

## Structure du projet

### Arborescence

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Composants réutilisables
│   │   │   └── header/         # En-tête
│   │   ├── models/             # Interfaces et types
│   │   │   └── user.model.ts
│   │   ├── pages/              # Pages de l'application
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   ├── upload/
│   │   │   ├── download/
│   │   │   └── history/
│   │   ├── services/           # Services métier
│   │   │   ├── auth.service.ts
│   │   │   ├── upload.service.ts
│   │   │   ├── download.service.ts
│   │   │   └── history.service.ts
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── main.ts
│   ├── assets/                 # Ressources statiques
│   └── environments/           # Configuration
├── cypress/                    # Tests E2E
├── docs/                       # Documentation
└── package.json
```

## Dépendances

### Dépendances principales

```json
{
  "@angular/common": "^19.2.0",
  "@angular/core": "^19.2.0",
  "@angular/router": "^19.2.0",
  "@angular/forms": "^19.2.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

### Dépendances de développement

```json
{
  "@angular/cli": "^19.2.19",
  "@angular-devkit/build-angular": "^19.2.19",
  "typescript": "~5.7.2",
  "karma": "~6.4.0",
  "jasmine-core": "~5.6.0",
  "cypress": "^13.0.0"
}
```

### Mise à jour des dépendances

#### Vérifier les mises à jour

```bash
# Vérifier toutes les dépendances
npm outdated

# Vérifier Angular spécifiquement
npm outdated @angular/core @angular/cli
```

#### Mettre à jour Angular

```bash
# 1. Mettre à jour Angular CLI globalement
npm install -g @angular/cli@latest

# 2. Mettre à jour les dépendances locales
ng update @angular/core @angular/cli

# 3. Mettre à jour les autres dépendances
ng update

# 4. Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# 5. Vérifier la build
npm run build
```

#### Mettre à jour Cypress

```bash
# Vérifier la version actuelle
npx cypress version

# Mettre à jour
npm install cypress@latest --save-dev

# Ouvrir Cypress pour vérifier
npx cypress open
```

## Tâches de maintenance

### Quotidiennes

- [ ] Vérifier les logs de build CI/CD
- [ ] Surveiller les erreurs JavaScript en production
- [ ] Vérifier la couverture de test

### Hebdomadaires

- [ ] Vérifier les vulnérabilités de sécurité
  ```bash
  npm audit
  npm audit fix
  ```
- [ ] Mettre à jour les dépendances mineures
- [ ] Exécuter tous les tests E2E
- [ ] Vérifier les performances (Lighthouse)

### Mensuelles

- [ ] Mettre à jour les dépendances principales
- [ ] Réviser et mettre à jour la documentation
- [ ] Analyser la dette technique
- [ ] Optimiser les performances
- [ ] Sauvegarder la configuration

### Trimestrielles

- [ ] Évaluer les nouvelles versions majeures d'Angular
- [ ] Refactoriser le code obsolète
- [ ] Mettre à jour les guidelines de codage
- [ ] Audit de sécurité complet

## Gestion des versions

### Versionnage sémantique

Nous utilisons le versionnage sémantique (SemVer) :

- **MAJOR** (X.0.0) : Changementsbreaking
- **MINOR** (0.X.0) : Nouvelles fonctionnalités compatibles
- **PATCH** (0.0.X) : Corrections de bugs compatibles

### Branches Git

```
main                    # Production
├── develop            # Développement
├── feature/*          # Nouvelles fonctionnalités
├── bugfix/*           # Corrections de bugs
├── hotfix/*           # Corrections urgentes
└── release/*          # Préparation de release
```

### Processus de release

```bash
# 1. Créer une branche de release
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Mettre à jour le numéro de version
npm version minor

# 3. Tester la release
npm run build
npm run test
npm run e2e:run

# 4. Merger dans main
git checkout main
git merge release/v1.2.0
git tag v1.2.0

# 5. Merger dans develop
git checkout develop
git merge main
```

## Monitoring et observabilité

### Logs applicatifs

#### Console logs (développement)

```typescript
// auth.service.ts
constructor(private logger: LoggerService) {}

login(credentials: LoginRequest): Observable<LoginResponse> {
  this.logger.info('Tentative de connexion', { email: credentials.email });
  return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
    .pipe(
      tap({
        next: (response) => this.logger.info('Connexion réussie'),
        error: (error) => this.logger.error('Échec de connexion', error)
      })
    );
}
```

### Erreurs en production

#### Sentry (recommandé)

```typescript
// main.ts
import * as Sentry from '@sentry/angular-ivy';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: environment.production ? 'production' : 'development'
});
```

#### Angular ErrorHandler

```typescript
// app.error-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Erreur globale:', error);
    // Envoyer à un service de monitoring
  }
}
```

### Métriques de performance

#### Web Vitals

```typescript
// performance.service.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  constructor() {
    getCLS(this.sendToAnalytics);
    getFID(this.sendToAnalytics);
    getLCP(this.sendToAnalytics);
  }

  private sendToAnalytics(metric: any) {
    // Envoyer vers Google Analytics, DataDog, etc.
    console.log('Performance metric:', metric);
  }
}
```

## Debugging

### Mode développement

```bash
# Lancer avec debug
npm start

# Chrome DevTools
# F12 > Sources > find files
```

### Tests de régression

```bash
# Exécuter tous les tests
npm test

# Tests E2E en mode headless
npm run e2e:run

# Tests spécifiques
npm test -- --grep "AuthService"
```

### Cypress Debug

```typescript
// cypress/e2e/test.cy.ts
describe('Debug test', () => {
  it('should debug', () => {
    cy.visit('/login');
    cy.get('body').debug(); // Affiche le HTML dans la console
    cy.get('#email').type('test').debug();
  });
});
```

## Sécurité

### Audit de sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix

# Auditer en profondeur
npm audit --audit-level moderate
```

### Mise à jour de sécurité

```bash
# Mettre à jour les packages de sécurité
npm update --depth 10

# Vérifier les dépendances transitives
npm list --depth 0
```

## Sauvegarde et restauration

### Configuration

- Sauvegarder `angular.json`
- Sauvegarder `tsconfig.json`
- Sauvegarder `cypress.config.ts`
- Sauvegarder `package.json`

### Scripts de build

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$DATE"

mkdir -p $BACKUP_DIR

# Sauvegarder la configuration
cp angular.json $BACKUP_DIR/
cp tsconfig.json $BACKUP_DIR/
cp cypress.config.ts $BACKUP_DIR/
cp package.json $BACKUP_DIR/

# Sauvegarder les sources importantes
cp -r src/app/services $BACKUP_DIR/
cp -r src/app/models $BACKUP_DIR/

echo "Sauvegarde créée: $BACKUP_DIR"
```

## Documentation

### Structure de la documentation

```
docs/
├── README.md          # Vue d'ensemble
├── TESTING.md         # Tests
├── SECURITY.md        # Sécurité
├── PERF.md           # Performance
├── MAINTENANCE.md    # Maintenance (ce fichier)
└── ARCHITECTURE.md   # Architecture
```

### Mise à jour de la documentation

```bash
# Après chaque changement majeur
# 1. Mettre à jour README.md
# 2. Mettre à jour TESTING.md
# 3. Mettre à jour SECURITY.md
# 4. Mettre à jour PERF.md
# 5. Mettre à jour MAINTENANCE.md
```

## Dépannage

### Problèmes courants

#### Erreur de build

```bash
# Nettoyer le cache
rm -rf node_modules
rm package-lock.json
npm install

# Vérifier Angular
ng version

# Rebuild
npm run build
```

#### Cypress ne fonctionne pas

```bash
# Réinstaller Cypress
npm uninstall cypress
npm install cypress --save-dev

# Vérifier l'installation
npx cypress verify
```

#### Tests unitaires échouent

```bash
# Lancer en mode watch
npm test

# Vérifier la configuration
cat karma.conf.js

# Vérifier les imports
grep -r "describe\|it(" src/app/**/*.spec.ts
```

## Contacts

### Équipe technique

- **Lead Developer** : dev@datashare.com
- **DevOps** : devops@datashare.com
- **QA** : qa@datashare.com

### Documentation externe

- [Angular Documentation](https://angular.io/docs)
- [Cypress Documentation](https://docs.cypress.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

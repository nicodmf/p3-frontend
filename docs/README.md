# DataShare - Frontend

## Description

Frontend Angular pour la plateforme de partage de fichiers DataShare. Cette application permet aux utilisateurs de créer un compte, se connecter, téléverser des fichiers, les partager via des liens et gérer leur historique.

## Technologies

- **Framework** : Angular 19.2.0
- **Language** : TypeScript 5.7.2
- **Styling** : SCSS
- **Tests E2E** : Cypress
- **Tests Unitaires** : Karma & Jasmine

## Fonctionnalités

### User Stories implémentées

1. **US01** - Téléverser un fichier avec un compte
   - Sélection de fichier
   - Ajout de titre et description
   - Authentification requise

2. **US02** - Télécharger via un lien public
   - Page de téléchargement sans authentification
   - Affichage des informations du fichier
   - Téléchargement direct

3. **US03** - Créer un compte
   - Formulaire d'inscription
   - Validation email et mot de passe
   - Confirmation mot de passe

4. **US04** - Se connecter
   - Authentification utilisateur
   - Gestion des tokens JWT
   - Redirection vers la page upload

5. **US05** - Consulter l'historique
   - Liste des fichiers téléversés
   - Affichage des métadonnées
   - Filtrage par utilisateur

6. **US06** - Supprimer un fichier
   - Confirmation de suppression
   - Mise à jour de l'historique
   - Gestion des erreurs

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start

# Exécuter les tests
npm test

# Exécuter les tests E2E
npm run e2e

# Construire pour la production
npm run build
```

## Architecture

### Structure des dossiers

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   └── header/         # En-tête avec logo et navigation
│   ├── models/             # Interfaces TypeScript
│   │   └── user.model.ts   # Modèles utilisateur et requêtes
│   ├── pages/              # Pages de l'application
│   │   ├── register/       # Page d'inscription
│   │   ├── login/          # Page de connexion
│   │   ├── upload/         # Page de téléversement
│   │   ├── download/       # Page de téléchargement
│   │   └── history/        # Page d'historique
│   ├── services/           # Services Angular
│   │   ├── auth.service.ts         # Authentification
│   │   ├── upload.service.ts       # Téléversement
│   │   ├── download.service.ts     # Téléchargement
│   │   └── history.service.ts      # Historique
│   ├── app.component.ts    # Composant racine
│   ├── app.routes.ts       # Configuration des routes
│   └── main.ts             # Point d'entrée
└── assets/                 # Ressources statiques
```

### Services

#### AuthService
- `register()` : Création de compte
- `login()` : Connexion utilisateur
- `logout()` : Déconnexion
- `isAuthenticated()` : Vérification authentification
- `getToken()` : Récupération du token JWT

#### UploadService
- `uploadFile()` : Téléversement de fichier avec métadonnées
- Gestion des headers d'authentification

#### DownloadService
- `getFileInfo()` : Récupération des informations du fichier
- `downloadFile()` : Téléchargement du fichier

#### HistoryService
- `getFiles()` : Liste des fichiers de l'utilisateur
- `deleteFile()` : Suppression d'un fichier

## Configuration

### Variables d'environnement

Les URLs de l'API sont configurées dans les services. Pour un environnement de production, modifiez :

```typescript
// src/app/services/*.service.ts
private readonly API_URL = 'https://api.datashare.com';
```

### Routes

```typescript
export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'download/:id', component: DownloadComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];
```

## Tests

### Tests E2E avec Cypress

```bash
# Mode interactif
npm run e2e

# Mode headless
npm run e2e:run
```

### Tests unitaires avec Karma/Jasmine

```bash
npm test
```

## Déploiement

### Build de production

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/`.

### Serveur web

Le frontend doit être servi par un serveur web (Apache, Nginx, ou serveur cloud).

## API Backend

Ce frontend communique avec une API REST backend. Assurez-vous que le backend expose les endpoints suivants :

- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `POST /api/upload` - Téléversement
- `GET /api/download/:id` - Informations du fichier
- `GET /api/history` - Historique des fichiers
- `DELETE /api/files/:id` - Suppression de fichier

## Navigateurs supportés

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## Licence

Propriétaire - Tous droits réservés

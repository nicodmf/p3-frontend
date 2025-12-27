# Configuration Proxy CORS

## Vue d'ensemble

Ce document explique la configuration du proxy pour éviter les erreurs CORS lors des appels API en développement.

## Configuration

### 1. Fichier proxy.conf.json

```json
{
  "/api/*": {
    "target": "http://localhost:5080",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}
```

### 2. angular.json

Le proxy est intégré dans `angular.json` pour les configurations development et e2e-coverage :

```json
{
  "projects": {
    "frontend": {
      "architect": {
        "serve": {
          "configurations": {
            "development": {
              "buildTarget": "frontend:build:development",
              "proxyConfig": "proxy.conf.json"
            },
            "e2e-coverage": {
              "buildTarget": "frontend:build:production",
              "proxyConfig": "proxy.conf.json"
            }
          }
        }
      }
    }
  }
}
```

### Explication

- **`/api/*`** : Toutes les requêtes commençant par `/api` seront redirigées
- **`target`** : URL du backend (http://localhost:5080)
- **`secure`** : Utilise HTTPS si le backend utilise HTTPS (false pour localhost)
- **`logLevel`** : Niveau de verbosité (debug, info, warn, error)
- **`changeOrigin`** : Change l'en-tête Origin de la requête
- **`pathRewrite`** : Conserve le préfixe `/api` lors de la转发
- **`proxyConfig`** : Référence vers `proxy.conf.json` dans angular.json

## Utilisation

### Lancer l'application avec proxy (développement)

```bash
npm start
```

L'application utilisera automatiquement la configuration `development` qui inclut le proxy.

L'application sera accessible sur `http://localhost:4200` et les appels à `/api/*` seront automatiquement redirigés vers `http://localhost:5080/*`.

### Lancer sans proxy (production)

```bash
npm run start:no-proxy
```

Lance le serveur en mode production (sans proxy).

### Utiliser une configuration spécifique

```bash
# Avec proxy (développement)
ng serve

# Avec proxy (e2e-coverage)
ng serve --configuration e2e-coverage

# Sans proxy (production)
ng serve --configuration production
```

## Comment ça marche

### Sans proxy

```
Frontend (http://localhost:4200) 
  → API Backend (http://localhost:5080)
  ❌ Erreur CORS : Origin mismatch
```

### Avec proxy

```
Frontend (http://localhost:4200)
  → Proxy (http://localhost:4200/api/*)
  → Backend (http://localhost:5080/*)
  ✅ Pas d'erreur CORS (même origin)
```

## Exemple d'appel API

### Dans les services Angular

```typescript
// auth.service.ts
register(request: RegisterRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`/api/auth/register`, request);
}
```

Avec le proxy, `/api/auth/register` devient :
- Requête : `http://localhost:4200/api/auth/register`
- Proxy转发 vers : `http://localhost:5080/api/auth/register`

## Services mis à jour

Tous les services utilisent maintenant des chemins relatifs :

- **AuthService** : `/api/auth/*`
- **UploadService** : `/api/files/upload`
- **DownloadService** : `/api/files/:id`
- **HistoryService** : `/api/files/history`

## Dépannage

### Le proxy ne fonctionne pas

1. Vérifiez que le backend tourne sur le port 5080
2. Redémarrez Angular : `Ctrl+C` puis `npm start`
3. Vérifiez les logs dans la console

### CORS persiste

1. Vérifiez que le backend accepte les requêtes depuis `http://localhost:4200`
2. Vérifiez les en-têtes CORS côté backend

## Sécurité

⚠️ **Important** : Le proxy ne doit être utilisé qu'en développement !

Pour la production :
- Servez le frontend et le backend depuis le même domaine
- Ou configurez correctement les en-têtes CORS côté backend

## Ressources

- [Angular Proxy Configuration](https://angular.io/guide/build#proxying-to-a-backend-server)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [CORS MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

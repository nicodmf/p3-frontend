# Configuration Proxy CORS

## Vue d'ensemble

Ce document explique la configuration du proxy pour éviter les erreurs CORS lors des appels API en développement.

## Configuration

### Fichier proxy.conf.json

```json
{
  "/api/*": {
    "target": "http://localhost:5080",
    "secure": true,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### Explication

- **`/api/*`** : Toutes les requêtes commençant par `/api` seront redirigées
- **`target`** : URL du backend (à adapter selon votre environnement)
- **`secure`** : Utilise HTTPS si le backend utilise HTTPS
- **`logLevel`** : Niveau de verbosité (debug, info, warn, error)
- **`changeOrigin`** : Change l'en-tête Origin de la requête
- **`pathRewrite`** : Retire le préfixe `/api` avant de转发 vers le backend

## Utilisation

### Lancer l'application avec proxy

```bash
npm start
```

### Lancer sans proxy (pour la production)

```bash
npm run start:no-proxy
```

## Adaptation selon l'environnement

### Backend en local (défaut)

Le proxy pointe vers `http://localhost:5080`.

### Backend sur un autre port

Modifiez `proxy.conf.json` :

```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": true,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### Backend distant (staging/production)

⚠️ **Important** : Le proxy ne doit être utilisé qu'en développement !

Pour la production, configurez directement les URLs dans les services :

```typescript
// src/app/services/auth.service.ts
private readonly API_URL = environment.production 
  ? 'https://api.datashare.com' 
  : '/api';
```

### Backend avec authentification SSL/TLS

```json
{
  "/api/*": {
    "target": "https://api.datashare.com",
    "secure": true,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

## Comment ça marche

### Sans proxy

```
Frontend (http://localhost:4200) 
  → API Backend (http://localhost:3000)
  ❌ Erreur CORS : Origin mismatch
```

### Avec proxy

```
Frontend (http://localhost:4200)
  → Proxy (http://localhost:4200/api/*)
  → Backend (http://localhost:3000/*)
  ✅ Pas d'erreur CORS (même origin)
```

## Exemple d'appel API

### Dans les services Angular

```typescript
// auth.service.ts
register(request: RegisterRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.API_URL}/register`, request);
}
```

Avec le proxy, `${this.API_URL}/register` devient :
- En développement : `/api/register` → `http://localhost:3000/register`
- En production : `https://api.datashare.com/register`

## Configuration par environnement

### angular.json

Pour des configurations différentes par environnement, modifiez `angular.json` :

```json
{
  "projects": {
    "frontend": {
      "architect": {
        "serve": {
          "configurations": {
            "development": {
              "browserTarget": "frontend:build:development",
              "proxyConfig": "proxy.conf.json"
            },
            "staging": {
              "browserTarget": "frontend:build:staging",
              "proxyConfig": "proxy.staging.conf.json"
            }
          }
        }
      }
    }
  }
}
```

Puis lancez :

```bash
ng serve --configuration=staging
```

## Dépannage

### Erreur : "Invalid or unexpected token"

Vérifiez que le fichier `proxy.conf.json` est valide JSON :
```bash
cat proxy.conf.json | python -m json.tool
```

### Le proxy ne fonctionne pas

1. Vérifiez que le backend tourne bien sur le port configuré
2. Redémarrez Angular : `Ctrl+C` puis `npm start`
3. Vérifiez les logs dans la console (logLevel: debug)

### CORS persiste

1. Vérifiez que le backend accepte les requêtes depuis `http://localhost:4200`
2. Vérifiez les en-têtes CORS côté backend :
   - `Access-Control-Allow-Origin: *` ou `http://localhost:4200`
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type, Authorization`

## Variables d'environnement

Pour une configuration dynamique, utilisez des variables d'environnement :

```bash
# .env
API_URL=http://localhost:3000
```

```typescript
// proxy.conf.json
{
  "/api/*": {
    "target": "${API_URL}",
    "secure": true,
    "changeOrigin": true
  }
}
```

⚠️ Note : Angular CLI ne supporte pas nativement la substitution de variables dans le proxy.conf.json.

## Sécurité

### En production

❌ **NE JAMAIS** utiliser le proxy en production !

- Le proxy n'est qu'un outil de développement
- En production, servez le frontend et le backend depuis le même domaine
- Ou configurez correctement les en-têtes CORS côté backend

### Recommandations

1. **Même domaine** : Frontend et backend sur le même domaine en production
2. **CORS backend** : Configurez correctement les en-têtes CORS côté serveur
3. **HTTPS** : Utilisez HTTPS en production pour sécuriser les communications

## Ressources

- [Angular Proxy Configuration](https://angular.io/guide/build#proxying-to-a-backend-server)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [CORS MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

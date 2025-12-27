# Guide de Sécurité - DataShare Frontend

## Vue d'ensemble

Ce document décrit les mesures de sécurité implémentées dans l'application DataShare Frontend et les bonnes pratiques à respecter.

## Authentification

### JWT (JSON Web Tokens)

L'application utilise des tokens JWT pour l'authentification :

#### Stockage du token

```typescript
// auth.service.ts
private setSession(authResult: LoginResponse) {
  const expiresAt = JSON.stringify(authResult.expires_at);
  localStorage.setItem('token', authResult.token);
  localStorage.setItem('expires_at', expiresAt);
}
```

**⚠️ Important** : Dans un environnement de production, envisagez d'utiliser :
- `HttpOnly` cookies au lieu de `localStorage`
- Token refresh mechanism
- Short-lived tokens (15-30 minutes)

#### Vérification de l'authentification

```typescript
isAuthenticated(): boolean {
  const token = this.getToken();
  if (!token) return false;

  const expiresAt = localStorage.getItem('expires_at');
  if (!expiresAt) return false;

  return new Date().getTime() < JSON.parse(expiresAt);
}
```

### Protection des routes

```typescript
export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [authGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [authGuard]
  }
];
```

## Validation des données

### Validation côté client

#### Formulaires réactifs

**RegisterComponent**
```typescript
registerForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required]]
}, { validators: this.passwordMatchValidator });

passwordMatchValidator(g: FormGroup) {
  return g.get('password')?.value === g.get('confirmPassword')?.value
    ? null : { mismatch: true };
}
```

**UploadComponent**
```typescript
uploadForm = this.fb.group({
  file: ['', [Validators.required]],
  title: ['', [Validators.required, Validators.maxLength(100)]],
  description: ['', [Validators.maxLength(500)]]
});
```

### Validation côté serveur (attendue)

⚠️ **Important** : La validation côté client est insuffisante. Le backend DOIT valider :

1. **Email** : Format valide, unicité
2. **Mot de passe** : Complexité (majuscules, minuscules, chiffres, symboles)
3. **Fichiers** : Type MIME, taille max, scan antivirus
4. **Upload** : Quota utilisateur, espace disque

## Sécurité des fichiers

### Téléversement de fichiers

#### Restrictions recommandées

1. **Types MIME autorisés**
   ```typescript
   const allowedTypes = [
     'image/jpeg',
     'image/png',
     'application/pdf',
     'text/plain'
   ];
   ```

2. **Taille maximale**
   ```typescript
   const maxSize = 10 * 1024 * 1024; // 10 MB
   ```

3. **Validation côté client**
   ```typescript
   onFileSelected(event: Event) {
     const file = (event.target as HTMLInputElement).files?.[0];
     if (!file) return;

     if (file.size > maxSize) {
       this.errorMessage = 'Le fichier dépasse la taille maximale';
       return;
     }

     if (!allowedTypes.includes(file.type)) {
       this.errorMessage = 'Type de fichier non autorisé';
       return;
     }
   }
   ```

#### Sanitisation des noms de fichiers

```typescript
private sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Remplacer caractères spéciaux
    .substring(0, 100); // Limiter la longueur
}
```

## Gestion des secrets

### Variables d'environnement

❌ **NE JAMAIS** commiter des secrets dans le code

✅ **UTILISEZ** :
```typescript
// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

```typescript
// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.datashare.com'
};
```

## Checklist de sécurité

### Avant la mise en production

- [ ] HTTPS configuré avec certificats valides
- [ ] Headers de sécurité configurés
- [ ] Validation côté serveur complète
- [ ] Tokens JWT avec expiration courte
- [ ] Rate limiting implémenté
- [ ] Logs de sécurité configurés
- [ ] Scan de vulnérabilités effectué
- [ ] Tests de pénétration réalisés
- [ ] Sauvegardes chiffrées configurées
- [ ] Plan de réponse aux incidents documenté

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.io/guide/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [RFC 7519 - JWT](https://tools.ietf.org/html/rfc7519)

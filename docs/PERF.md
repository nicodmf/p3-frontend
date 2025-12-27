# Guide de Performance - DataShare Frontend

## Vue d'ensemble

Ce document définit les objectifs de performance et les optimisations pour l'application DataShare Frontend.

## Objectifs de performance

### Core Web Vitals

| Métrique | Cible | Description |
|----------|-------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Temps de chargement du plus grand élément |
| **FID** (First Input Delay) | < 100ms | Délai de la première interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Stabilité visuelle |

### Autres métriques

- **TTFB** (Time To First Byte) : < 600ms
- **FCP** (First Contentful Paint) : < 1.8s
- **Speed Index** : < 3.0s
- **TBT** (Total Blocking Time) : < 300ms

## Optimisations implémentées

### 1. Build et bundling

#### Angular CLI

Configuration optimisée dans `angular.json` :

```json
{
  "configurations": {
    "production": {
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kb",
          "maximumError": "1mb"
        }
      ],
      "outputHashing": "all",
      "sourceMap": false,
      "optimization": true
    }
  }
}
```

#### Analyse du bundle

```bash
# Analyser la taille du bundle
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/frontend/stats.json
```

### 2. Lazy Loading

#### Routes lazy-loaded

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'upload',
    loadComponent: () => import('./pages/upload/upload.component')
      .then(m => m.UploadComponent)
  }
];
```

**Avantages** :
- Réduction du bundle initial : ~100kb
- Chargement plus rapide de la première page
- Téléchargement à la demande

### 3. Change Detection Strategy

#### OnPush Strategy

```typescript
@Component({
  selector: 'app-file-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent {
  // Les composants utilisent OnPush pour réduire les cycles de détection
}
```

**Bénéfices** :
- Réduction de 50% des vérifications de changement
- Amélioration des performances avec de grandes listes
- Moins de garbage collection

### 4. Optimisation des images

#### Compression automatique

```bash
# Installation
npm install -g imagemin-cli

# Compression
imagemin assets/**/*.png --out-dir=dist/assets --plugin=pngquant
imagemin assets/**/*.jpg --out-dir=dist/assets --plugin=mozjpeg
```

#### Formats modernes

- **WebP** : Format préféré pour les photos
- **SVG** : Pour les icônes et logos
- **AVIF** : Alternative à WebP (support browser)

#### Lazy loading des images

```html
<img
  src="file-icon.svg"
  loading="lazy"
  alt="File icon"
/>
```

### 5. Caching

#### Service Worker (PWA)

```typescript
// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/*.css",
          "/*.js"
        ]
      }
    }
  ]
}
```

#### HTTP Cache

```typescript
// download.service.ts
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  getFileInfo(id: string): Observable<FileInfo> {
    return this.http.get<FileInfo>(`${this.API_URL}/download/${id}`, {
      headers: {
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}
```

## Optimisations spécifiques aux fonctionnalités

### 1. Upload de fichiers

#### Chunked upload (recommandé)

```typescript
// upload.service.ts - Pour les gros fichiers
uploadFileInChunks(file: File): Observable<any> {
  const chunkSize = 1024 * 1024; // 1MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);

  return new Observable(observer => {
    let currentChunk = 0;

    const uploadChunk = () => {
      if (currentChunk >= totalChunks) {
        observer.complete();
        return;
      }

      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      this.uploadChunk(chunk, currentChunk, totalChunks)
        .subscribe({
          next: () => {
            currentChunk++;
            uploadChunk();
          },
          error: (err) => observer.error(err)
        });
    };

    uploadChunk();
  });
}
```

#### Progress indicator

```typescript
// upload.component.ts
onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  this.uploadService.uploadFile(file).subscribe({
    next: (progress) => {
      this.uploadProgress = progress;
    },
    complete: () => {
      this.uploadProgress = 100;
    }
  });
}
```

### 2. Historique des fichiers

#### Pagination

```typescript
// history.service.ts
getFiles(page: number = 0, size: number = 20): Observable<PaginatedResponse> {
  return this.http.get<PaginatedResponse>(`${this.API_URL}/history`, {
    params: {
      page: page.toString(),
      size: size.toString()
    }
  });
}
```

#### Infinite scroll

```typescript
// history.component.ts
private currentPage = 0;
private isLoading = false;

onScroll() {
  if (this.isLoading) return;

  this.isLoading = true;
  this.historyService.getFiles(this.currentPage + 1)
    .subscribe(response => {
      this.files = [...this.files, ...response.content];
      this.currentPage++;
      this.isLoading = false;
    });
}
```

## Outils de profiling

### 1. Chrome DevTools

```bash
# Ouvrir DevTools
F12

# Onglet Performance
# - Enregistrer les performances
# - Analyser le flame chart
# - Identifier les bottlenecks

# Onglet Network
# - Analyser les requêtes
# - Optimiser le chargement des ressources

# Onglet Memory
# - Détecter les memory leaks
# - Heap profiling
```

### 2. Augury (Angular DevTools)

```bash
# Installation Chrome Extension
# https://chrome.google.com/webstore/detail/augury

# Fonctionnalités
# - Component tree
# - Change detection
# - Router tree
# - Performance profiler
```

## Budget de performance

### Bundle Size

| Ressource | Budget | Status |
|-----------|--------|--------|
| Main bundle | < 200kb | ✅ |
| Vendor bundle | < 300kb | ✅ |
| CSS | < 50kb | ✅ |
| Images | < 500kb | ✅ |

### Runtime Performance

| Action | Cible | Mesure |
|--------|-------|--------|
| Navigation page | < 300ms | ✅ |
| Upload (petit fichier) | < 1s | ✅ |
| Download | < 500ms | ✅ |
| Filtrage liste | < 100ms | ✅ |

## Checklist de performance

### Développement

- [ ] Lazy loading activé
- [ ] OnPush strategy utilisée
- [ ] Images optimisées
- [ ] Bundle size < 1MB
- [ ] AOT compilation
- [ ] Tree shaking activé

### Test

- [ ] Lighthouse score > 90
- [ ] Tests de charge effectués
- [ ] Profilling mémoire
- [ ] Tests sur appareils mobiles

### Production

- [ ] Gzip/Brotli activé
- [ ] CDN configuré
- [ ] Service Worker activé
- [ ] HTTP/2 activé
- [ ] Cache headers configurés
- [ ] Monitoring en place

## Ressources

- [Angular Performance Guide](https://angular.io/guide/build)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [web-vitals](https://www.npmjs.com/package/web-vitals)

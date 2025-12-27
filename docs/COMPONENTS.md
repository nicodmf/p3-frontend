# Système de Composants UI DataShare

## Vue d'ensemble

Le système de composants UI de DataShare est une bibliothèque de composants réutilisables construite avec Angular et documentée avec Storybook.

## 📚 Storybook

Storybook est un outil open source pour développer des composants UI en isolation. Il permet de voir tous les composants et leurs variations dans un environnement de développement interactif.

### Lancer Storybook

```bash
# Mode développement (http://localhost:6006)
npm run storybook

# Ou directement avec npx
npx storybook dev -p 6006

# Construire la version statique
npm run build-storybook

# Ou directement avec npx
npx storybook build
```

**Note** : Storybook v8.6.14 fonctionne avec npx et la configuration dans `.storybook/`.

## 🎨 Composants Disponibles

### 1. Input Component

**Localisation :** `src/app/ui/input/`

**Variations :**
- Default - Champ de saisie standard
- WithLabel - Avec libellé
- Optional - Champ optionnel
- Focused - État focus
- Disabled - Désactivé
- EmailInput - Champ email spécialisé

**Utilisation :**

```html
<ui-input
  label="Email"
  placeholder="votre@email.com"
  type="email"
  [optional]="false"
  [disabled]="false">
</ui-input>
```

**Propriétés :**
- `label` : Texte du libellé
- `placeholder` : Texte d'aide
- `type` : Type du champ (text, password, email, etc.)
- `optional` : Indique si le champ est optionnel
- `disabled` : Désactive le champ

---

### 2. Select Component

**Localisation :** `src/app/ui/select/`

**Variations :**
- Default - Menu déroulant standard
- WithLabel - Avec libellé et option pré-sélectionnée
- Disabled - Désactivé
- FileType - Exemple type de fichier
- Language - Exemple de sélection de langue

**Utilisation :**

```html
<ui-select
  label="Expiration"
  [options]="[
    { value: '1day', label: 'Une journée' },
    { value: '1week', label: 'Une semaine' }
  ]"
  [disabled]="false"
  (selectionChange)="onSelectionChange($event)">
</ui-select>
```

**Propriétés :**
- `label` : Texte du libellé
- `options` : Liste des options (value, label)
- `selectedValue` : Valeur pré-sélectionnée
- `disabled` : Désactive le select
- `selectionChange` : Événement émis lors de la sélection

---

### 3. Button Component

**Localisation :** `src/app/ui/button/`

**Variations :**
- Primary - Bouton principal (gradient orange)
- Secondary - Bouton secondaire (fond noir)
- Outline - Bouton contour
- Ghost - Bouton fantôme
- Small/Medium/Large - Différentes tailles
- Disabled - Désactivé
- Loading - État de chargement
- AllVariants - Affiche toutes les variantes
- AllSizes - Affiche toutes les tailles

**Utilisation :**

```html
<ui-button
  label="Téléverser"
  variant="primary"
  size="md"
  [disabled]="false"
  [loading]="false"
  type="button"
  (click)="onUpload()">
  Upload
</ui-button>
```

**Propriétés :**
- `label` : Texte du bouton
- `variant` : Variante (primary, secondary, outline, ghost)
- `size` : Taille (sm, md, lg)
- `disabled` : Désactive le bouton
- `loading` : Affiche un spinner
- `type` : Type HTML (button, submit, reset)

---

### 4. Switch Component

**Localisation :** `src/app/ui/switch/`

**Variations :**
- Default - Switch standard
- Checked - État activé
- WithLabel - Avec libellé personnalisé
- Disabled - Désactivé
- FileStatus - Exemple de filtre de fichiers
- AllFilters - Affiche plusieurs filtres

**Utilisation :**

```html
<ui-switch
  label="Notifications"
  [checked]="false"
  [disabled]="false"
  textOn="Actifs"
  textOff="Tous"
  (checkedChange)="onToggle($event)">
</ui-switch>
```

**Propriétés :**
- `label` : Texte du libellé
- `checked` : État du switch
- `disabled` : Désactive le switch
- `textOn` : Texte affiché quand activé
- `textOff` : Texte affiché quand désactivé
- `checkedChange` : Événement émis lors du changement

---

### 5. Header Component

**Localisation :** `src/app/ui/header/`

**Variations :**
- Default - En-tête standard avec bouton
- WithCustomTitle - Titre personnalisé
- WithoutButton - Sans bouton de connexion
- CustomButtonText - Texte personnalisé pour le bouton
- WithNavigation - Avec navigation personnalisée

**Utilisation :**

```html
<ui-header
  title="DataShare"
  [showLoginButton]="true"
  loginButtonText="Se connecter">
  <nav>
    <a href="#">Accueil</a>
    <a href="#">Fichiers</a>
  </nav>
</ui-header>
```

**Propriétés :**
- `title` : Titre/logo
- `showLoginButton` : Affiche le bouton de connexion
- `loginButtonText` : Texte du bouton

**Slot :** Contenu personnalisé (ex: navigation)

---

### 6. Callout Component

**Localisation :** `src/app/ui/callout/`

**Variations :**
- Info - Message d'information (bleu)
- Success - Message de succès (vert)
- Warning - Message d'avertissement (orange)
- Error - Message d'erreur (rouge)
- WithoutTitle - Sans titre
- WithSlot - Avec contenu personnalisé
- AllVariants - Affiche tous les types
- WarningWithLongText - Message long

**Utilisation :**

```html
<ui-callout
  type="success"
  title="Succès"
  message="Votre fichier a été téléversé avec succès.">
</ui-callout>
```

**Propriétés :**
- `type` : Type (info, success, warning, error)
- `title` : Titre du message
- `message` : Contenu du message

**Slot :** Contenu personnalisé (HTML, liens, etc.)

## 🎯 Design System

### Polices
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Couleurs
- **Primaire :** Gradient #FFB88C → #DE6262
- **Accent :** #FF812D
- **Texte :** #1E1E1E (principal), #6B7280 (secondaire)
- **Fond :** #2C2C2C (boutons secondaires)
- **Bordures :** #D1D5DB, #E5E7EB
- **État :** #B3B3B3 (placeholders), #F9FAFB (désactivé)

### Espacements
- Unité de base : 0.25rem
- Paddings courants : 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem
- Margins : Multiples de 0.25rem

### Bordures
- Radius standard : 0.5rem
- Radius complet : 9999px (pour les switches)

### Animations
- Transition : 0.2s ease
- Hover effects avec translateY(-1px) et box-shadow
- Loading spinner avec animation spin

## 📦 Structure des Fichiers

```
src/
├── app/
│   └── ui/
│       ├── input/
│       │   └── input.component.ts
│       ├── select/
│       │   └── select.component.ts
│       ├── button/
│       │   └── button.component.ts
│       ├── switch/
│       │   └── switch.component.ts
│       ├── header/
│       │   └── header.component.ts
│       └── callout/
│           └── callout.component.ts
└── stories/
    ├── Introduction.mdx
    ├── input.stories.ts
    ├── select.stories.ts
    ├── button.stories.ts
    ├── switch.stories.ts
    ├── header.stories.ts
    └── callout.stories.ts
```

## 🚀 Développement

### Ajouter un Nouveau Composant

1. Créer le composant dans `src/app/ui/[nom]/`
2. Créer les stories dans `src/stories/[nom].stories.ts`
3. Mettre à jour `Introduction.mdx` avec la documentation
4. Tester avec `npm run storybook`

### Standards de Code

- Utiliser des composants standalone Angular
- Importer CommonModule et autres modules nécessaires
- Définir les @Input() et @Output() appropriés
- Utiliser des styles SCSS avec le design system
- Ajouter la documentation dans les stories

### Tests

Chaque composant doit avoir :
- Storybook stories avec toutes les variations
- Tests unitaires (à implémenter)
- Documentation claire

## 📖 Ressources

- [Storybook pour Angular](https://storybook.js.org/docs/get-started/install/angular)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)
- [Design System DataShare](#) (référence interne)

---

**Version :** 1.0.0
**Dernière mise à jour :** Décembre 2025

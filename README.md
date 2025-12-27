# DataShare - Frontend Angular

## Composants UI

Ce projet contient une bibliothèque de composants UI pour l'application DataShare, créée selon les maquettes du fichier `sujet/maquettes/composants.pdf`.

### Composants Implémentés

#### 1. Header Component
- **Localisation** : `src/app/components/header/`
- **Usage** : En-tête de l'application avec logo et bouton de connexion
- **Storybook** : `Header.stories.ts`

#### 2. Input Component
- **Localisation** : `src/app/components/input/`
- **Usage** : Champ de saisie avec label
- **Props** :
  - `label` : Label du champ
  - `type` : Type de l'input (text, password, email, etc.)
  - `placeholder` : Texte d'aide
  - `value` : Valeur du champ
  - `required` : Champ obligatoire
  - `disabled` : Champ désactivé
- **Storybook** : `Input.stories.ts` (Default, TextInput, EmailInput, Disabled, Required)

#### 3. Select Component
- **Localisation** : `src/app/components/select/`
- **Usage** : Liste déroulante avec options
- **Props** :
  - `label` : Label du select
  - `options` : Tableau d'options `{value: string, label: string}`
  - `value` : Valeur sélectionnée
  - `placeholder` : Texte par défaut
  - `disabled` : Select désactivé
- **Storybook** : `Select.stories.ts` (Default, WithSelectedValue, Disabled, SimpleOptions)

#### 4. Button Component
- **Localisation** : `src/app/components/button/`
- **Usage** : Bouton d'action avec 4 variantes de style
- **Props** :
  - `label` : Texte du bouton
  - `variant` : Style (primary, secondary, tertiary, quaternary)
    - **primary** : Fond orange transparent (21%), bordure rgba(205, 94, 20, 0.5), texte #BA681F
    - **secondary** : Fond transparent, bordure rgba(255, 165, 105, 1), texte rgba(226, 127, 41, 1)
    - **tertiary** : Idem secondary mais bordure transparente
    - **quaternary** : Fond rgba(44, 44, 44, 1), texte rgba(243, 238, 234, 1)
  - `size` : Taille (small, medium, large)
  - `disabled` : Bouton désactivé (couleurs en attente)
  - `fullWidth` : Pleine largeur
  - `leftIcon` : Icône à gauche du texte
  - `rightIcon` : Icône à droite du texte
- **Storybook** : `Button.stories.ts` (Primary, Secondary, Tertiary, Quaternary, WithLeftIcon, WithRightIcon, WithBothIcons, Small, Large, Disabled, FullWidth)

#### 5. Callout Component
- **Localisation** : `src/app/components/callout/`
- **Usage** : Message d'information/notification
- **Props** :
  - `type` : Type (info, success, warning, error)
  - `title` : Titre du message
  - `message` : Contenu du message
  - `closable` : Fermable par l'utilisateur
  - `icon` : Icône personnalisée
- **Storybook** : `Callout.stories.ts` (Info, Success, Warning, Error, Closable, WithLabelOnly)

#### 6. Switch Component
- **Localisation** : `src/app/components/switch/`
- **Usage** : Bouton de filtre/selection multiple
- **Props** :
  - `label` : Label du groupe
  - `options` : Tableau d'options `{value: string, label: string}`
  - `value` : Option sélectionnée
  - `disabled` : Switch désactivé
- **Storybook** : `Switch.stories.ts` (Default, WithSelectedValue, Disabled, SimpleToggle, WithLabel)

### Utilisation des Composants

Tous les composants sont exportés dans `src/app/components/index.ts` :

```typescript
import { InputComponent, ButtonComponent, SelectComponent } from './components';
```

### Storybook

Pour lancer Storybook :

```bash
npm run storybook
```

Storybook sera accessible sur http://localhost:6006

Pour builder Storybook :

```bash
npm run build-storybook
```

### Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Composant Header
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   ├── header.component.scss
│   │   │   └── header.stories.ts
│   │   ├── input/            # Composant Input
│   │   ├── select/           # Composant Select
│   │   ├── button/           # Composant Button
│   │   ├── callout/          # Composant Callout
│   │   ├── switch/           # Composant Switch
│   │   └── index.ts          # Export de tous les composants
│   └── ...
└── ...
```

### Scripts Disponibles

- `npm start` - Lance le serveur de développement Angular
- `npm run storybook` - Lance Storybook sur le port 6006
- `npm run build-storybook` - Build la version statique de Storybook
- `npm test` - Lance les tests unitaires
- `npm run e2e` - Lance les tests E2E (Cypress)

### Technologies

- Angular 19.2.0
- TypeScript 5.7.2
- Storybook 8.6.15
- SCSS pour les styles

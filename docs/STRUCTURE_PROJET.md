# 📁 Structure du Projet Lyr-IA

## 🎯 Organisation Propre et Professionnelle

Le projet a été complètement réorganisé pour une meilleure maintenabilité et clarté.

---

## 📂 Structure des Dossiers

```
D:\Mon App Lyria\
├── 📁 src/                          # Code source principal
│   ├── App.tsx                      # Composant principal
│   ├── index.tsx                    # Point d'entrée
│   ├── index.css                    # Styles globaux
│   ├── types.ts                     # Définitions TypeScript
│   ├── 📁 components/               # Composants React
│   │   ├── MainGenerator.tsx
│   │   ├── Analyzer.tsx
│   │   ├── Editor.tsx
│   │   ├── AccountView.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── 📁 achievements/         # Système de succès
│   │   ├── 📁 common/               # Composants réutilisables
│   │   ├── 📁 community/            # Fonctions communauté
│   │   ├── 📁 controls/             # Contrôles UI
│   │   ├── 📁 marketing/            # Marketing
│   │   ├── 📁 selectors/            # Sélecteurs personnalisés
│   │   └── 📁 subscriptions/        # Gestion abonnements
│   ├── 📁 contexts/                 # Contextes React
│   │   ├── AppContexts.tsx
│   │   ├── DataContext.tsx
│   │   ├── HistoryContext.tsx
│   │   ├── PersonalProfilesContext.tsx
│   │   ├── SupabaseUserContext.tsx
│   │   └── UserContext.tsx
│   ├── 📁 services/                 # Services et logique métier
│   │   ├── geminiService.ts
│   │   ├── authService.ts
│   │   ├── stripeService.ts
│   │   ├── supabaseClient.ts
│   │   └── ... (14 fichiers au total)
│   ├── 📁 hooks/                    # Hooks React personnalisés
│   │   └── usePlanRestrictions.ts
│   └── 📁 __tests__/                # Tests
│       └── smoke.test.tsx
│
├── 📁 constants/                    # Toutes les constantes de l'app
│   ├── constants.ts                 # Fichier principal
│   ├── constants_achievements.ts
│   ├── constants_achievements_data.ts
│   ├── constants_anime.ts
│   ├── constants_artists.ts
│   ├── constants_artists_all.ts
│   ├── constants_helpers.ts
│   ├── constants_moderation.ts
│   ├── constants_monetization.ts
│   ├── constants_structures.ts
│   ├── constants_styles.ts
│   └── constants_ui.ts
│
├── 📁 scripts/                      # Scripts utilitaires
│   ├── merge_artists.cjs
│   ├── diagnose_stripe.js
│   └── stripe_setup.cjs
│
├── 📁 docs/                         # Documentation complète
│   ├── CHANGEMENT_NOM_LYR-IA.md
│   ├── README.md
│   ├── REBRANDING_COMPLET.md
│   ├── 📁 deployment/               # Guides de déploiement
│   │   ├── DEPLOIEMENT_RAPIDE.md
│   │   ├── DEPLOY_GEMINI_PROXY.md
│   │   ├── DEPLOYMENT_SUCCESS.md
│   │   └── GUIDE_HEBERGEMENT_GRATUIT.md
│   ├── 📁 setup/                    # Guides de configuration
│   │   ├── CONFIGURATION_CHECKLIST.md
│   │   ├── CONFIGURATION_URGENTE.md
│   │   ├── CONFIGURATION_VERTEX_FRAGMOVIE.md
│   │   ├── MIGRATION_COMPLETE_GUIDE.md
│   │   ├── MIGRATION_TO_SUPABASE.md
│   │   ├── NEXT_STEPS_MIGRATION.md
│   │   ├── SETUP_COMPLETE_LYRIA.md
│   │   ├── SETUP_STRIPE_WEBHOOK.md
│   │   ├── stripe_setup_guide.md
│   │   ├── supabase_setup_guide.md
│   │   └── supabase_web_setup.md
│   ├── 📁 features/                 # Documentation des fonctionnalités
│   │   ├── COMMUNITY_HUB_COMPLETE.md
│   │   ├── FEATURE_FRAGMOVIE_PRESETS.md
│   │   ├── FEATURE_INSTRUMENTAL_DESCRIPTION.md
│   │   ├── FRAGMOVIE_FPS_GUIDE.md
│   │   ├── GUIDE_TRADUCTION.md
│   │   ├── GUIDE_VERTEX_FRAGMOVIE.md
│   │   ├── PLAYLISTS_AND_BADGES_COMPLETE.md
│   │   ├── SYSTEM_ACHIEVEMENTS_FINAL.md
│   │   └── UPDATE_CHILL_PROGRESSIVE_PRESETS.md
│   ├── 📁 fixes/                    # Historique des corrections
│   │   ├── ACHIEVEMENTS_FIX.md
│   │   ├── DIAGNOSTIC_ABONNEMENT.md
│   │   ├── DIAGNOSTIC_LOADING_INFINI.md
│   │   ├── FIXES_APPLIED.md
│   │   ├── FIXES_SUBSCRIPTION.md
│   │   ├── FIX_ACHIEVEMENTS_PERSISTENCE.md
│   │   ├── FIX_GEMINI_JSON_SCHEMA.md
│   │   ├── FIX_GEMINI_TEXT_RESPONSES.md
│   │   ├── FIX_NULL_VALUES.sql
│   │   ├── FIX_STRIPE_URL.md
│   │   ├── HISTORIQUE_FIX.md
│   │   └── STRIPE_FIXES_COMPLETE.md
│   └── 📁 archive/                  # Anciens fichiers et archives
│       ├── ACHIEVEMENTS_HISTORY_SUMMARY.md
│       ├── ANNULATION_TRADUCTION.md
│       ├── AUDIT_COMPLETE_LOCALSTORAGE.md
│       ├── AUDIT_DATABASE.sql
│       ├── COMMUNAUTE_DESACTIVEE.md
│       ├── POURQUOI_PAS_TOUT_TRADUIT.md
│       ├── community_features_archive/
│       ├── deno.lock
│       ├── metadata.json
│       └── supabase_seed.json
│
├── 📁 supabase/                     # Configuration Supabase
│   ├── config.toml
│   ├── 📁 functions/                # Edge Functions
│   │   ├── create-checkout-session/
│   │   ├── gemini-proxy/
│   │   └── stripe-webhook/
│   └── 📁 migrations/               # Migrations SQL
│       ├── 001_initial_schema.sql
│       ├── 002_complete_schema.sql
│       ├── 003_community_features.sql
│       ├── create_avatars_bucket.sql
│       ├── debug_auth.sql
│       └── ...
│
├── 📁 public/                       # Fichiers publics statiques
│   ├── _redirects                   # Config pour Netlify
│   ├── lyria-badge-glowy.png        # Logo badge
│   └── lyria-txt-white copie.png    # Logo texte
│
├── 📄 Fichiers de configuration racine
├── package.json                     # Dépendances Node.js
├── package-lock.json
├── tsconfig.json                    # Configuration TypeScript
├── vite.config.ts                   # Configuration Vite
├── vitest.config.ts                 # Configuration tests
├── tailwind.config.js               # Configuration Tailwind
├── postcss.config.js                # Configuration PostCSS
├── eslint.config.js                 # Configuration ESLint
├── vercel.json                      # Configuration Vercel
├── index.html                       # HTML principal
├── README.md                        # README principal
└── STRUCTURE_PROJET.md              # Ce fichier
```

---

## 🔧 Alias de Chemins (Path Aliases)

Pour faciliter les imports, les alias suivants sont configurés dans `vite.config.ts` :

```typescript
{
  '@': './src',                    // Accès au dossier src
  '@constants': './constants',     // Accès aux constantes
}
```

### Exemples d'utilisation :

```typescript
// ❌ Ancien (chemins relatifs complexes)
import { ARTISTS } from '../../../constants_artists';
import { MyComponent } from '../../components/MyComponent';

// ✅ Nouveau (alias propres)
import { ARTISTS } from '@constants/constants_artists';
import { MyComponent } from '@/components/MyComponent';

// Note: Les images logo sont dans public/ et accessibles via /nom-fichier.png
```

---

## 📝 Fichiers Essentiels à la Racine

Seuls les fichiers de configuration essentiels restent à la racine :

- `package.json` - Gestion des dépendances
- `tsconfig.json` - Configuration TypeScript  
- `vite.config.ts` - Configuration du bundler
- `tailwind.config.js` - Configuration CSS
- `eslint.config.js` - Linting
- `vercel.json` - Déploiement
- `index.html` - Point d'entrée HTML
- `README.md` - Documentation principale
- `STRUCTURE_PROJET.md` - Ce fichier

---

## 🎯 Avantages de cette Organisation

### ✅ **Clarté**
- Chaque type de fichier a son dossier dédié
- Plus facile de trouver ce qu'on cherche
- Structure logique et intuitive

### ✅ **Maintenabilité**
- Les constantes sont séparées du code source
- La documentation est organisée par catégorie
- Les scripts utilitaires sont isolés

### ✅ **Scalabilité**
- Structure prête pour l'ajout de nouvelles fonctionnalités
- Facile d'ajouter de nouveaux modules
- Organisation professionnelle

### ✅ **Performance de Build**
- Imports optimisés avec les alias
- Séparation claire des dépendances
- Meilleure organisation pour le tree-shaking

---

## 📚 Documentation

Toute la documentation est maintenant organisée dans `docs/` :

- **`docs/deployment/`** - Tout sur le déploiement (Vercel, Netlify, domaines)
- **`docs/setup/`** - Configuration initiale (Supabase, Stripe, migrations)
- **`docs/features/`** - Documentation des fonctionnalités
- **`docs/fixes/`** - Historique des corrections et diagnostics
- **`docs/archive/`** - Anciens fichiers pour référence

---

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Preview du build
npm run preview

# Tests
npm run test

# Linting
npm run lint
```

---

## 🔄 Mises à Jour

Cette structure a été mise en place le **21 octobre 2025** lors de la réorganisation complète du projet.

Tous les chemins d'import ont été mis à jour pour utiliser les nouveaux alias et refléter la nouvelle structure.

---

## ✨ Notes Importantes

1. **Ne jamais déplacer** `node_modules/` ou `dist/` - ces dossiers sont générés
2. **Utiliser les alias** `@` et `@constants` pour les imports
3. **Images publiques** - Placer dans `public/` (accessibles via `/nom-fichier.png`)
4. **Documenter** les nouvelles fonctionnalités dans `docs/features/`
5. **Garder la racine propre** - mettre les nouveaux fichiers dans les dossiers appropriés

---

**Structure organisée par l'IA Assistant ✨**
**Projet : Lyr-IA - Générateur de Paroles avec IA**


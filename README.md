# 🎵 Lyr-IA - Générateur de Paroles avec Intelligence Artificielle

<div align="center">

![Lyr-IA](https://i.postimg.cc/T3j4zZ1j/lyria-new-logo.png)

**Créez des paroles de chansons uniques avec l'IA**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)

</div>

---

## 📖 Table des Matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Démarrage Rapide](#-démarrage-rapide)
- [Structure du Projet](#-structure-du-projet)
- [Documentation](#-documentation)
- [Technologies](#-technologies)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🎯 À Propos

**Lyr-IA** est une plateforme web innovante qui utilise l'intelligence artificielle pour générer des paroles de chansons personnalisées. Que vous soyez musicien professionnel, créateur de contenu ou simplement passionné de musique, Lyr-IA vous aide à donner vie à vos idées musicales.

### Pourquoi Lyr-IA ?

- 🎨 **Créativité Augmentée** - L'IA comme co-pilote créatif
- ⚡ **Rapidité** - Générez des paroles en quelques secondes
- 🎭 **Personnalisation** - Styles, ambiances et structures sur mesure
- 🌍 **Universel** - Supporte de nombreux styles musicaux et artistes
- 💎 **Professionnel** - Outils avancés pour peaufiner vos créations

---

## ✨ Fonctionnalités

### 🎼 Générateur Principal
- **Modes de Génération**
  - Mode Artiste : Inspirez-vous de vos artistes préférés
  - Mode Anime : Créez des openings/endings d'anime
  - Mode Personnalisé : Utilisez vos propres profils d'entraînement
  - Mode Instrumental : Descriptions pour musiques sans paroles
  
- **Contrôle Créatif**
  - Choix de la structure de chanson (Couplet-Refrain, AABA, etc.)
  - Sélection de l'ambiance (Énergique, Mélancolique, etc.)
  - Fusion de styles musicaux
  - Paramètres de copyright

### 🎨 Éditeur Avancé
- **Modification de Paroles** avec dictionnaire de rimes intégré
- **Génération de Pochettes** à partir du texte
- **Modification d'Images** avec prompts IA

### 📊 Analyseur
- Analyse complète de vos paroles
- Statistiques et métriques détaillées
- Suggestions d'amélioration

### 🏆 Système de Succès
- Plus de 50 succès à débloquer
- Récompenses en crédits et titres
- Succès secrets à découvrir

### 💼 Plans d'Abonnement
- **Découverte** - Pour débuter (gratuit)
- **Créateur** - Pour créateurs réguliers
- **Pro** - Pour professionnels
- **Ultimate** - Accès complet
- **Business** - Avec kit marketing
- **Lyr-IA Society** - Plan exclusif sur invitation

### 🌐 Fonctionnalités Communautaires
- Partage de créations
- Profils publics
- Système de playlists
- Badges personnalisés

---

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Compte Supabase
- Compte Stripe (pour les paiements)
- Clé API Google Gemini

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/lyr-ia.git
cd lyr-ia

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env.local à la racine avec :
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_publique
# (voir docs/setup/ pour la configuration complète)

# Lancer en développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

---

## ⚡ Démarrage Rapide

1. **Créer un compte** sur l'application
2. **Choisir votre mode de génération** (Artiste, Anime, Personnalisé)
3. **Remplir le formulaire** avec vos préférences
4. **Générer** et laissez l'IA créer vos paroles
5. **Éditer et peaufiner** avec les outils d'édition
6. **Exporter** vers Suno AI ou partager avec la communauté

---

## 📁 Structure du Projet

```
lyr-ia/
├── src/                 # Code source principal
│   ├── components/      # Composants React
│   ├── contexts/        # Contextes React
│   ├── services/        # Services et logique métier
│   ├── hooks/           # Hooks personnalisés
│   └── types.ts         # Définitions TypeScript
├── constants/           # Constantes de l'application
├── assets/              # Images et ressources
├── scripts/             # Scripts utilitaires
├── docs/                # Documentation complète
│   ├── deployment/      # Guides de déploiement
│   ├── setup/           # Guides de configuration
│   ├── features/        # Documentation des fonctionnalités
│   └── fixes/           # Historique des corrections
├── supabase/            # Configuration Supabase
│   ├── functions/       # Edge Functions
│   └── migrations/      # Migrations SQL
└── public/              # Fichiers statiques
```

Pour plus de détails, voir [docs/STRUCTURE_PROJET.md](docs/STRUCTURE_PROJET.md)

---

## 📚 Documentation

Toute la documentation est organisée dans le dossier `docs/` :

### 🚀 Déploiement
- [Guide de Déploiement Rapide](docs/deployment/DEPLOIEMENT_RAPIDE.md)
- [Guide d'Hébergement Gratuit](docs/deployment/GUIDE_HEBERGEMENT_GRATUIT.md)

### ⚙️ Configuration
- [Configuration Complète](docs/setup/CONFIGURATION_CHECKLIST.md)
- [Setup Supabase](docs/setup/supabase_setup_guide.md)
- [Setup Stripe](docs/setup/stripe_setup_guide.md)

### 🎨 Fonctionnalités
- [Système de Succès](docs/features/SYSTEM_ACHIEVEMENTS_FINAL.md)
- [Hub Communautaire](docs/features/COMMUNITY_HUB_COMPLETE.md)
- [Guide de Traduction](docs/features/GUIDE_TRADUCTION.md)

### 📝 Autres
- [Structure du Projet](docs/STRUCTURE_PROJET.md)
- [Historique du Rebranding](docs/REBRANDING_COMPLET.md)

---

## 🛠️ Technologies

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first

### Backend & Services
- **Supabase** - Backend as a Service (Auth, Database, Storage)
- **Google Gemini** - IA générative pour les paroles
- **Stripe** - Gestion des paiements

### DevOps
- **Vercel** - Hébergement et déploiement
- **GitHub** - Gestion de version
- **ESLint** - Linting
- **Vitest** - Tests unitaires

---

## 🌐 Déploiement

### Déploiement sur Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

Votre app sera accessible à `https://votre-projet.vercel.app`

### Autres Options

- **Netlify** - Alternative à Vercel
- **GitHub Pages** - Hébergement gratuit
- **Cloudflare Pages** - Performance optimale

Voir le [Guide d'Hébergement Gratuit](docs/deployment/GUIDE_HEBERGEMENT_GRATUIT.md) pour plus de détails.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines

- Suivre les conventions de code existantes
- Documenter les nouvelles fonctionnalités
- Ajouter des tests si applicable
- Mettre à jour la documentation

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👥 Auteurs

- **Équipe Lyr-IA** - Développement et maintenance

---

## 🙏 Remerciements

- Google pour l'API Gemini
- Supabase pour le backend
- La communauté open source

---

## 📞 Support

- **Documentation** : [docs/](docs/)
- **Issues** : [GitHub Issues](https://github.com/votre-username/lyr-ia/issues)
- **Email** : support@lyr-ia.app

---

<div align="center">

**Fait avec ❤️ par l'équipe Lyr-IA**

[Site Web](https://lyr-ia.app) • [Documentation](docs/) • [Démo](https://demo.lyr-ia.app)

</div>

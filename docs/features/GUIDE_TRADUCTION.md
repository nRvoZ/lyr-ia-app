# 🌍 Guide de Traduction - Lyr-IA

## ✅ **Système de Traduction Installé !**

Le système de traduction (i18n) est maintenant opérationnel avec support Français/Anglais.

---

## 🎯 **Ce Qui Fonctionne Déjà**

### **✅ Infrastructure Complète**
- ✅ Contexte de langue (`LanguageContext`)
- ✅ Hook `useLanguage()` disponible partout
- ✅ Fichiers de traduction (`fr.ts`, `en.ts`)
- ✅ Sélecteur de langue avec drapeaux dans le header

### **✅ Traductions Actives**
- ✅ Navigation (Générateur, Analyseur, Éditeur, Mon Compte, Admin)
- ✅ Bouton "Connexion / Inscription"

---

## 📁 **Structure des Fichiers**

```
src/
├── contexts/
│   └── LanguageContext.tsx          ← Contexte de langue
├── components/
│   └── LanguageSelector.tsx         ← Sélecteur FR/EN avec drapeaux
├── i18n/
│   ├── translations.ts              ← Export des traductions
│   ├── fr.ts                        ← Traductions françaises
│   └── en.ts                        ← Traductions anglaises
```

---

## 🔧 **Comment Utiliser dans un Composant**

### **1. Importer le Hook**
```typescript
import { useLanguage } from '../contexts/LanguageContext';
```

### **2. Utiliser dans le Composant**
```typescript
function MonComposant() {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t('generator.title')}</h1>
      <button>{t('common.save')}</button>
      <p>Langue actuelle : {language}</p>
    </div>
  );
}
```

---

## 📝 **Comment Ajouter des Traductions**

### **Étape 1 : Ajouter dans `fr.ts`**
```typescript
export const fr = {
  generator: {
    title: 'Générateur de Chansons IA',
    mode: 'Mode de génération',
    generate: 'Générer',
  },
};
```

### **Étape 2 : Ajouter dans `en.ts`**
```typescript
export const en = {
  generator: {
    title: 'AI Song Generator',
    mode: 'Generation Mode',
    generate: 'Generate',
  },
};
```

### **Étape 3 : Utiliser dans le Code**
```typescript
const { t } = useLanguage();

<h1>{t('generator.title')}</h1>
<button>{t('generator.generate')}</button>
```

---

## 📊 **Traductions Déjà Disponibles**

### **Navigation**
- `nav.generator` - Générateur / Generator
- `nav.analyzer` - Analyseur / Analyzer
- `nav.editor` - Éditeur / Editor
- `nav.account` - Mon Compte / My Account
- `nav.community` - Communauté / Community
- `nav.admin` - Admin / Admin
- `nav.login` - Connexion / Inscription / Login / Sign Up

### **Plans & Abonnements**
- `plans.free` - Gratuit / Free
- `plans.creator` - Creator
- `plans.pro` - Pro
- `plans.secretSociety` - Secret Society
- `plans.credits` - crédits / credits
- `plans.upgrade` - Améliorer / Upgrade
- `plans.manageSubscription` - Gérer mon abonnement / Manage Subscription

### **Générateur**
- `generator.title` - Générateur de Chansons IA / AI Song Generator
- `generator.mode` - Mode de génération / Generation Mode
- `generator.language` - Langue / Language
- `generator.generate` - Générer / Generate
- `generator.quickGenerate` - Génération Rapide / Quick Generate
- `generator.burstGenerate` - Génération en Rafale / Burst Generate
- `generator.generating` - Génération en cours... / Generating...

### **Analyseur**
- `analyzer.title` - Analyseur Musical / Music Analyzer
- `analyzer.subtitle` - Analysez une chanson... / Analyze an existing song...
- `analyzer.analyze` - Analyser / Analyze
- `analyzer.analyzing` - Analyse en cours... / Analyzing...

### **Éditeur**
- `editor.title` - Éditeur de Paroles & Pochettes / Lyrics & Cover Editor
- `editor.lyrics` - Paroles / Lyrics
- `editor.albumArt` - Pochette d'album / Album Cover
- `editor.save` - Enregistrer / Save
- `editor.cancel` - Annuler / Cancel

### **Compte**
- `account.title` - Mon Compte / My Account
- `account.profile` - Profil / Profile
- `account.history` - Historique / History
- `account.profileSection.username` - Pseudo / Username
- `account.profileSection.save` - Enregistrer / Save
- `account.profileSection.logout` - Déconnexion / Logout

### **Communs**
- `common.loading` - Chargement... / Loading...
- `common.error` - Erreur / Error
- `common.success` - Succès / Success
- `common.save` - Enregistrer / Save
- `common.delete` - Supprimer / Delete
- `common.cancel` - Annuler / Cancel
- `common.close` - Fermer / Close
- `common.back` - Retour / Back
- `common.copy` - Copier / Copy
- `common.copied` - Copié ! / Copied!

---

## 🎯 **Prochaines Étapes pour Traduction Complète**

### **Composants à Traduire**
1. **MainGenerator.tsx** - Formulaire de génération
2. **Analyzer.tsx** - Interface d'analyse
3. **Editor.tsx** - Éditeur de paroles et pochettes
4. **AccountView.tsx** - Profil et historique
5. **SettingsModal.tsx** - Paramètres
6. **SubscriptionModal.tsx** - Modal d'abonnement
7. **AchievementsModal.tsx** - Modal de succès
8. **LegendModal.tsx** - Modal de légende

### **Exemple pour MainGenerator**
```typescript
// Dans MainGenerator.tsx
import { useLanguage } from '../contexts/LanguageContext';

function MainGenerator() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('generator.title')}</h1>
      <label>{t('generator.labels.theme')}</label>
      <input placeholder={t('generator.placeholders.theme')} />
      <button>{t('generator.generate')}</button>
    </div>
  );
}
```

---

## 🌐 **Sélecteur de Langue**

Le sélecteur est déjà intégré dans le header avec :
- 🇫🇷 Drapeau français
- 🇬🇧 Drapeau anglais
- Changement instantané
- Sauvegarde dans localStorage

---

## 💡 **Conseils**

1. **Clés cohérentes** : Utilisez des clés claires comme `section.subsection.key`
2. **Même structure** : Gardez la même structure dans `fr.ts` et `en.ts`
3. **Placeholders** : Pensez aux placeholders, labels, et messages d'erreur
4. **Test** : Testez en changeant de langue avec le sélecteur

---

## 🚀 **Résultat**

L'utilisateur peut maintenant :
- ✅ Changer de langue avec le sélecteur 🇫🇷 / 🇬🇧
- ✅ Voir la navigation traduite
- ✅ Avoir un changement instantané
- ✅ Conserver le choix dans localStorage

**Le système est prêt pour traduire toute l'application ! 🎉**




// Script pour ajouter toutes les icônes manquantes aux Easter Eggs
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../constants/constants_achievements_data.ts');

// Icônes pour tous les Easter Eggs
const easterEggIcons = {
  'easter_egg_sound_check': '🔊',
  'easter_egg_studio_tour': '🚪',
  'easter_egg_franco_viking': '⚔️',
  'easter_egg_lofi_beats': '🎧',
  'easter_egg_konami_code': '🎮',
  'easter_egg_logo_spam': '🖱️',
  'easter_egg_sandwich': '🥪',
  'easter_egg_hidden_pixel': '🔍',
  'easter_egg_over_9000': '💪',
  'easter_egg_all_your_base': '👾',
  'easter_egg_man_machine': '🤖',
  'easter_egg_theme_spammer': '🌈',
  'easter_egg_number_of_the_beast': '😈',
  'easter_egg_rickroll': '🎵',
  'easter_egg_spotify_wrapped': '📊',
  'easter_egg_tiktok_viral': '📱',
  'easter_egg_ai_takeover': '🤖',
  'easter_egg_404': '⚠️',
  'easter_egg_hello_world': '👋',
  'easter_egg_matrix': '💊',
  'easter_egg_winter_is_coming': '❄️',
  'easter_egg_fibonacci': '🔢',
  'easter_egg_pi_day': '🥧',
  'easter_egg_42': '📚',
  'easter_egg_666_beast_mode': '👹',
  'easter_egg_night_owl': '🦉',
  'easter_egg_speed_demon': '💨',
  'easter_egg_perfectionist': '🎯',
  'easter_egg_delete_master': '🗑️',
  'easter_egg_hoarder': '📦',
  'easter_egg_halloween': '🎃',
  'easter_egg_christmas': '🎄',
  'easter_egg_new_year': '🎆',
  'easter_egg_valentine': '💝',
  'easter_egg_music_day': '🎶',
  'easter_egg_master_collector': '🏆',
  'easter_egg_lucky_777': '🎰',
  'easter_egg_1000_songs': '⭐'
};

// Lire le fichier
let content = fs.readFileSync(filePath, 'utf8');

// Ajouter les icônes manquantes
Object.entries(easterEggIcons).forEach(([id, icon]) => {
  const regex = new RegExp(`(id: '${id}'[^}]+)(\\})`, 'g');
  content = content.replace(regex, `$1, icon: "${icon}" }`);
});

// Écrire le fichier modifié
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Icônes Easter Eggs ajoutées avec succès !');

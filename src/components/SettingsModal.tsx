import React, { useContext, useEffect, useRef } from 'react';
import { SettingsContext, ThemeContext, FontColorContext, AchievementContext } from '../contexts/AppContexts';
import { COPYRIGHT_OPTIONS } from '@constants/constants';
import GlassCard from './common/GlassCard';
import ModernCheckbox from './common/ModernCheckbox';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customBg: string | null;
  setCustomBg: (bg: string | null) => void;
  onSetRandomBg: () => void;
  isBgLoading?: boolean;
}

// A simple utility to darken a hex color for hover states
const darkenColor = (hex: string, percent: number): string => {
  try {
    let [r, g, b] = hex.slice(1).match(/.{2}/g)!.map(x => parseInt(x, 16));
    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));
    return `#${[r,g,b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  } catch (e) {
    console.error("Invalid hex color:", hex);
    return '#000000'; // fallback
  }
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, customBg, setCustomBg, onSetRandomBg, isBgLoading = false }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { theme, setTheme, themes } = useContext(ThemeContext);
  const { fontColor, setFontColor } = useContext(FontColorContext);
  const { triggerAchievementCheck } = useContext(AchievementContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const amplifyToggleTimestamps = useRef<number[]>([]);
  const themeChangeTimestamps = useRef<number[]>([]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Appliquer la taille de police
  useEffect(() => {
    const root = document.documentElement;
    switch (settings.fontSize) {
      case 'small':
        root.style.setProperty('--font-size-base', '14px');
        root.style.setProperty('--font-size-sm', '12px');
        root.style.setProperty('--font-size-lg', '16px');
        break;
      case 'large':
        root.style.setProperty('--font-size-base', '18px');
        root.style.setProperty('--font-size-sm', '16px');
        root.style.setProperty('--font-size-lg', '20px');
        break;
      default: // medium
        root.style.setProperty('--font-size-base', '16px');
        root.style.setProperty('--font-size-sm', '14px');
        root.style.setProperty('--font-size-lg', '18px');
    }
  }, [settings.fontSize]);


  if (!isOpen) return null;

  const handleAmplifyToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(s => ({ ...s, amplifyPrompt: e.target.checked }));
    
    // Easter Egg Logic
    const now = Date.now();
    amplifyToggleTimestamps.current.push(now);
    // Keep only timestamps from the last 5 seconds
    amplifyToggleTimestamps.current = amplifyToggleTimestamps.current.filter(ts => now - ts < 5000);
    if (amplifyToggleTimestamps.current.length >= 10) {
        triggerAchievementCheck('SOUND_CHECK');
        amplifyToggleTimestamps.current = []; // Reset
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleThemeChange = () => {
    const now = Date.now();
    themeChangeTimestamps.current.push(now);
    themeChangeTimestamps.current = themeChangeTimestamps.current.filter(ts => now - ts < 5000); // 15 clicks in 5s
    if (themeChangeTimestamps.current.length >= 15) {
        triggerAchievementCheck('THEME_SPAM');
        themeChangeTimestamps.current = []; // Reset
    }
  };


  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrimary = e.target.value;
    setTheme({ 
      ...theme, 
      name: 'Custom', 
      primary: newPrimary, 
      primaryHover: darkenColor(newPrimary, 10) 
    });
    handleThemeChange();
    triggerAchievementCheck('CUSTOMIZE_THEME');
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSecondary = e.target.value;
    setTheme({ ...theme, name: 'Custom', secondary: newSecondary });
    handleThemeChange();
    triggerAchievementCheck('CUSTOMIZE_THEME');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCustomBg(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-4xl">
        <GlassCard className="p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-base-color mb-1">⚙️ Paramètres</h2>
                    <p className="text-sm text-muted-color">Personnalise ton expérience Lyr-IA</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg text-muted-color hover:text-base-color transition-all hover:rotate-90"
                >
                    ✕
                </button>
            </div>
            
            {/* Sections en grille compacte */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Génération - Version compacte */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-base-color flex items-center gap-2 mb-4">
                        <span className="text-xl">🎵</span> Génération
                    </h3>
                    
                    {/* Copyright - Version compacte */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label htmlFor="copyright-select" className="block text-sm font-medium text-base-color mb-2">
                            Copyright
                        </label>
                        <select
                            id="copyright-select"
                            value={settings.copyright}
                            onChange={(e) => setSettings(s => ({ ...s, copyright: e.target.value as any }))}
                            className="w-full bg-input rounded-md p-2 text-sm text-base-color focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                        >
                            {COPYRIGHT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-slate-800">{opt.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* AI Model - Version compacte */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label htmlFor="model-select" className="block text-sm font-medium text-base-color mb-2">
                            Modèle IA
                        </label>
                        <select
                            id="model-select"
                            value={settings.aiModel}
                            onChange={(e) => setSettings(s => ({ ...s, aiModel: e.target.value }))}
                            className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-sm text-base-color focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
                        >
                            <option value="gemini-2.5-flash" className="bg-slate-800">⚡ Flash (Rapide)</option>
                            <option value="gemini-2.5-flash-creative" className="bg-slate-800">✨ Creative (Qualité)</option>
                            <option value="gemini-2.5-flash-concise" className="bg-slate-800">🎯 Concise (Précis)</option>
                        </select>
                    </div>
                </div>


                {/* Section Apparence - Version compacte */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-base-color flex items-center gap-2 mb-4">
                        <span className="text-xl">🎨</span> Apparence
                    </h3>
                    
                    {/* Thèmes - Version compacte */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label className="block text-sm font-medium text-base-color mb-2">
                            Thèmes
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {themes.map(t => (
                                <button
                                    key={t.name}
                                    onClick={() => { setTheme(t); handleThemeChange(); }}
                                    className={`h-8 rounded-md transition-all hover:scale-110 ${theme.name === t.name ? 'ring-2 ring-white/50' : ''}`}
                                    style={{ backgroundImage: `linear-gradient(135deg, ${t.secondary}, ${t.primary})` }}
                                    title={t.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Couleurs personnalisées - Version compacte */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label className="block text-sm font-medium text-base-color mb-2">
                            Couleurs
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="primary-color" className="text-xs text-muted-color block mb-1">Primaire</label>
                                <input 
                                    id="primary-color" 
                                    type="color" 
                                    value={theme.primary} 
                                    onChange={handlePrimaryChange} 
                                    className="w-full h-8 p-1 bg-white/10 border border-white/20 rounded-md cursor-pointer hover:scale-105 transition-transform" 
                                />
                            </div>
                            <div>
                                <label htmlFor="secondary-color" className="text-xs text-muted-color block mb-1">Secondaire</label>
                                <input 
                                    id="secondary-color" 
                                    type="color" 
                                    value={theme.secondary} 
                                    onChange={handleSecondaryChange} 
                                    className="w-full h-8 p-1 bg-white/10 border border-white/20 rounded-md cursor-pointer hover:scale-105 transition-transform" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Taille des polices */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label className="block text-sm font-medium text-base-color mb-2">
                            Taille du texte
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setSettings(s => ({ ...s, fontSize: 'small' }))}
                                className={`px-3 py-2 text-xs font-medium rounded-md transition-all ${settings.fontSize === 'small' ? 'bg-green-500/20 text-green-300 shadow-md scale-105' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                            >
                                Aa Petit
                            </button>
                            <button
                                onClick={() => setSettings(s => ({ ...s, fontSize: 'medium' }))}
                                className={`px-3 py-2 text-xs font-medium rounded-md transition-all ${settings.fontSize === 'medium' ? 'bg-green-500/20 text-green-300 shadow-md scale-105' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                            >
                                Aa Normal
                            </button>
                            <button
                                onClick={() => setSettings(s => ({ ...s, fontSize: 'large' }))}
                                className={`px-3 py-2 text-xs font-medium rounded-md transition-all ${settings.fontSize === 'large' ? 'bg-green-500/20 text-green-300 shadow-md scale-105' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                            >
                                Aa Grand
                            </button>
                        </div>
                    </div>

                    {/* Arrière-plan - Version compacte */}
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <label className="block text-sm font-medium text-base-color mb-2">
                            Arrière-plan
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-2 text-xs font-medium rounded-md transition-all bg-white/10 hover:bg-white/20 text-base-color"
                            >
                                📁 Importer
                            </button>
                            <button
                                onClick={onSetRandomBg}
                                disabled={isBgLoading}
                                className="px-3 py-2 text-xs font-medium rounded-md transition-all bg-white/10 hover:bg-white/20 text-base-color disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isBgLoading ? '⏳...' : '🎲 Aléatoire'}
                            </button>
                            {customBg && (
                                <button
                                    onClick={() => setCustomBg(null)}
                                    className="px-3 py-2 text-xs font-medium rounded-md transition-all bg-red-500/20 hover:bg-red-500/40 text-red-400"
                                >
                                    🗑️ Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer compact */}
            <div className="mt-6 flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-md text-sm font-medium text-base-color bg-white/10 hover:bg-white/20 transition-all"
                >
                    Annuler
                </button>
                <button
                    onClick={onClose}
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`
                    }}
                    className="px-6 py-2 rounded-md text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                    ✓ Enregistrer
                </button>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SettingsModal;

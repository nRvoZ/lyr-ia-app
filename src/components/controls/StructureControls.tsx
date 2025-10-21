import React, { useMemo, useState, useEffect, useContext } from 'react';
import type { SongStructure } from '../../types';
import { SubscriptionPlan } from '../../types';
import ModernCheckbox from '../../../src/components/common/ModernCheckbox';
import CustomSelect, { CustomSelectOption } from '../../../src/components/common/CustomSelect';
import { UserContext } from '../../contexts/SupabaseUserContext';
import { UIActionContext, AchievementContext } from '../../contexts/AppContexts';
import { DataContext } from '../../contexts/DataContext';
import PlanLockOverlay from '../../../src/components/common/PlanLockOverlay';
import { usePlanRestrictions } from '../../hooks/usePlanRestrictions';
import { PremiumIcon } from '../common/LockIcons';

interface StructureControlsProps {
    songStructures: SongStructure[];
    selectedStructure: SongStructure;
    setSelectedStructure: (s: SongStructure) => void;
    varyChoruses: boolean;
    setVaryChoruses: (v: boolean) => void;
    chorusDuration?: 'short' | 'medium' | 'long';
    setChorusDuration?: (d: 'short' | 'medium' | 'long') => void;
    includeInstrumentalParts: boolean;
    setIncludeInstrumentalParts: (i: boolean) => void;
    autoStructureValue: string | null;
    amplifyPrompt: boolean;
    setAmplifyPrompt: (a: boolean) => void;
}
interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}
const CrownIcon = PremiumIcon;
const ControlModeButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; isLocked?: boolean; }> = ({ label, isActive, onClick, isLocked = false }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center justify-center ${
            isActive && !isLocked 
                ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-105' 
                : 'text-muted-color hover:bg-white/10 hover:scale-105'
        } ${isLocked ? 'cursor-pointer' : ''}`}
        title={isLocked ? "Fonctionnalité premium. Débloquez avec un plan supérieur." : ""}
    >
        <span>{label}</span>
        {isLocked && <CrownIcon />}
    </button>
);

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const StructureControls: React.FC<StructureControlsProps> = (props) => {
    const { songStructures, selectedStructure, setSelectedStructure, varyChoruses, setVaryChoruses, chorusDuration, setChorusDuration, includeInstrumentalParts, setIncludeInstrumentalParts, autoStructureValue, amplifyPrompt, setAmplifyPrompt } = props;
    
    const [controlMode, setControlMode] = useState<'auto' | 'manual' | 'advanced'>('auto');
    const [customParts, setCustomParts] = useState<string[]>(selectedStructure.parts);
    const [animateAdvanced, setAnimateAdvanced] = useState(false);

    const { user } = useContext(UserContext);
    const appData = useContext(DataContext);
    const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);
    const { triggerAchievementCheck } = useContext(AchievementContext);

    // Utiliser notre nouveau système de restrictions
    const planRestrictions = usePlanRestrictions();

    if (!appData) return <div>Chargement...</div>;
    const { plans } = appData;

    // Utiliser les nouvelles permissions
    const permissions = planRestrictions.permissions;
    const isManualLocked = !permissions.manualStructure;
    const isAdvancedLocked = !permissions.advancedStructure;
    const isVaryChorusesLocked = !permissions.varyChorus;
    const isInstrumentalLocked = !permissions.instrumentalParts;

    // Obtenir les noms des plans requis
    const planNeededForManual = planRestrictions.getMinimumPlanForFeature('manualStructure');
    const planNeededForAdvanced = planRestrictions.getMinimumPlanForFeature('advancedStructure');
    const planNeededForVaryChoruses = planRestrictions.getMinimumPlanForFeature('varyChorus');
    const planNeededForInstrumental = planRestrictions.getMinimumPlanForFeature('instrumentalParts');
    
    const handleSetControlMode = (newMode: 'auto' | 'manual' | 'advanced') => {
        if (newMode === 'advanced' && controlMode !== 'advanced') {
            setAnimateAdvanced(true);
            setTimeout(() => {
                setAnimateAdvanced(false);
            }, 500); // Corresponds to the animation duration
        }
        setControlMode(newMode);
    };

    // Fallback to a safe mode if the current mode is locked
    useEffect(() => {
        if (isManualLocked && (controlMode === 'manual' || controlMode === 'advanced')) {
            handleSetControlMode('auto');
        } else if (isAdvancedLocked && controlMode === 'advanced') {
            handleSetControlMode('auto');
        }
    }, [isManualLocked, isAdvancedLocked, controlMode, user.plan]);

    const handleLockedClick = () => {
        if (user.isAuthenticated) {
            onUpgradeOpen();
        } else {
            onAuthOpen();
        }
    };

    const isFrench = useMemo(() => songStructures.some(s => s.parts.includes('[COUPLET 1]')), [songStructures]);
    const AVAILABLE_PARTS = isFrench
      ? ['Intro', 'Couplet', 'Pré-Refrain', 'Refrain', 'Post-Refrain', 'Pont', 'Solo', 'Outro', 'Instrumental', 'Breakdown', 'Drop', 'Montée', 'Riff', 'Parlé', 'Fast Flow', 'Hook']
      : ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Post-Chorus', 'Bridge', 'Solo', 'Outro', 'Instrumental', 'Breakdown', 'Drop', 'Buildup', 'Riff', 'Spoken', 'Fast Flow', 'Hook'];
    
    const structureOptions: CustomSelectOption<string>[] = useMemo(() => songStructures.map(s => ({ value: s.value, searchValue: s.name, displayValue: s.name, label: <div><div className="text-base-color">{s.name}</div><div className="text-xs text-muted-color truncate">{s.parts.join(' - ')}</div></div> })), [songStructures]);
    const autoStructureName = useMemo(() => songStructures.find(s => s.value === autoStructureValue)?.name, [songStructures, autoStructureValue]);
    
    // Effect to handle automatic structure selection
    useEffect(() => {
        if (controlMode === 'auto' && autoStructureValue) {
            const newStructure = songStructures.find(s => s.value === autoStructureValue);
            if (newStructure && newStructure.value !== selectedStructure.value) {
                setSelectedStructure(newStructure);
            }
        }
    }, [autoStructureValue, controlMode, songStructures, setSelectedStructure, selectedStructure.value]);

    // Effect to synchronize customParts when switching modes
    useEffect(() => {
        if (controlMode === 'advanced') {
            setCustomParts(selectedStructure.parts);
        }
    }, [controlMode, selectedStructure]);

    const updateParentWithCustomStructure = (newParts: string[]) => {
        setCustomParts(newParts);

        // This is a new action that will be checked for several achievements
        triggerAchievementCheck('CUSTOM_STRUCTURE_CREATED', { parts: newParts });

        const matchingStructure = songStructures.find(s => JSON.stringify(s.parts) === JSON.stringify(newParts));
        if (matchingStructure) {
            setSelectedStructure(matchingStructure);
        } else {
            setSelectedStructure({
                name: isFrench ? 'Structure Personnalisée' : 'Custom Structure',
                value: 'custom-' + newParts.join('-'),
                parts: newParts,
            });
        }
    };
    
    const getNextPartName = (partBase: string): string => {
        const partBaseUpper = partBase.toUpperCase().replace('-', ' ');
        const isNumbered = (isFrench && ['COUPLET', 'REFRAIN', 'SOLO', 'INSTRUMENTAL', 'RIFF', 'FAST FLOW', 'HOOK'].includes(partBaseUpper)) || (!isFrench && ['VERSE', 'CHORUS', 'SOLO', 'INSTRUMENTAL', 'RIFF', 'FAST FLOW', 'HOOK'].includes(partBaseUpper));
        
        if (!isNumbered) {
            return `[${partBaseUpper}]`;
        }

        const regex = new RegExp(`^\\[${partBaseUpper} (\\d+)\\]$`);
        let maxNum = 0;
        customParts.forEach(part => {
            const match = part.match(regex);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNum) maxNum = num;
            }
        });
        return `[${partBaseUpper} ${maxNum + 1}]`;
    };

    const handleAddPart = (partBase: string) => {
        const newPart = getNextPartName(partBase);
        updateParentWithCustomStructure([...customParts, newPart]);
    };

    const handleRemovePart = (indexToRemove: number) => {
        const newParts = customParts.filter((_, index) => index !== indexToRemove);
        updateParentWithCustomStructure(newParts);
    };

    const AdvancedEditor = () => (
        <div className={`space-y-4 pt-4 ${animateAdvanced ? 'animate-fade-in' : ''}`}>
            <div>
                <label className="block text-xs font-semibold text-muted-color mb-2">Ajouter des briques</label>
                <div className="flex flex-wrap gap-2">
                    {AVAILABLE_PARTS.map(part => (
                        <button key={part} onClick={() => handleAddPart(part)} className="flex items-center space-x-1 px-3 py-1.5 text-xs rounded-md bg-white/50 dark:bg-black/30 hover:bg-primary/30 transition-colors">
                            <PlusIcon /><span>{part}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-muted-color">Structure actuelle</label>
                    <button onClick={() => updateParentWithCustomStructure([])} className="text-xs text-muted-color hover:text-red-400 flex items-center space-x-1">
                        <TrashIcon /><span>Vider</span>
                    </button>
                </div>
                <div className="min-h-[6rem] p-2 rounded-lg bg-black/10 border border-white/10">
                    {customParts.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {customParts.map((part, index) => (
                                <div key={index} className="flex items-center bg-primary/30 text-primary-light rounded">
                                    <span className="px-2 py-1 text-sm font-medium">{part}</span>
                                    <button onClick={() => handleRemovePart(index)} className="p-1.5 hover:bg-red-500/50 rounded-r transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-sm text-muted-color py-4">Commencez à construire votre structure.</p>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex space-x-2 rounded-lg bg-black/20 p-1">
                <ControlModeButton label="Auto" isActive={controlMode === 'auto'} onClick={() => handleSetControlMode('auto')} />
                <ControlModeButton
                    label="Manuel"
                    isActive={controlMode === 'manual'}
                    onClick={isManualLocked ? handleLockedClick : () => handleSetControlMode('manual')}
                    isLocked={isManualLocked}
                />
                <ControlModeButton
                    label="Avancé"
                    isActive={controlMode === 'advanced'}
                    onClick={isAdvancedLocked ? handleLockedClick : () => handleSetControlMode('advanced')}
                    isLocked={isAdvancedLocked}
                />
            </div>
            
            {controlMode === 'auto' && (
                <div className="opacity-70">
                    <CustomSelect options={structureOptions} value={selectedStructure.value} onChange={() => {}} disabled={true} />
                    {autoStructureName && <p className="text-xs text-muted-color mt-1">Suggéré : <span className="text-primary-light">{autoStructureName}</span></p>}
                </div>
            )}
            {controlMode === 'manual' && (
                <CustomSelect options={structureOptions} value={selectedStructure.value} onChange={(v) => setSelectedStructure(songStructures.find(s => s.value === v)!)} />
            )}
            {controlMode === 'advanced' && <AdvancedEditor />}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {/* Groupe gauche : Varier les refrains + Durée du refrain + Inclure des parties instrumentales (empilées verticalement) */}
                <div className="flex flex-col gap-3">
                    {/* Varier les refrains avec Durée inline */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                id="vary-choruses"
                                type="checkbox"
                                checked={varyChoruses}
                                onChange={e => setVaryChoruses(e.target.checked)}
                                disabled={isVaryChorusesLocked}
                                className="sr-only peer"
                            />
                            <div className="w-5 h-5 bg-white/50 dark:bg-black/30 border border-slate-400 dark:border-slate-600 rounded-md flex items-center justify-center transition-all duration-200 peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)] peer-disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 transform ${varyChoruses ? 'scale-100' : 'scale-0'}`}>
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </label>
                        <div className="flex items-center gap-1">
                            <span className={`text-sm text-base-color ${isVaryChorusesLocked ? 'opacity-50' : ''}`}>
                                {isFrench ? "Varier les refrains" : "Vary choruses"}
                            </span>
                            {isVaryChorusesLocked && (
                                <button
                                    onClick={user.isAuthenticated ? onUpgradeOpen : onAuthOpen}
                                    title={`Nécessite le plan ${planNeededForVaryChoruses}`}
                                    className="cursor-pointer flex-shrink-0"
                                >
                                    <CrownIcon />
                                </button>
                            )}
                        </div>
                        
                        {/* Durée du refrain - inline à droite */}
                        {varyChoruses && !isVaryChorusesLocked && chorusDuration && setChorusDuration && (
                            <div className="flex items-center gap-2 ml-4">
                                <span className="text-xs text-base-color/70">Durée :</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setChorusDuration('short')}
                                        className={`px-2 py-1 text-xs rounded transition-all ${
                                            chorusDuration === 'short'
                                                ? 'bg-primary text-on-primary'
                                                : 'bg-white/20 text-base-color hover:bg-white/30'
                                        }`}
                                    >
                                        Court
                                    </button>
                                    <button
                                        onClick={() => setChorusDuration('medium')}
                                        className={`px-2 py-1 text-xs rounded transition-all ${
                                            chorusDuration === 'medium'
                                                ? 'bg-primary text-on-primary'
                                                : 'bg-white/20 text-base-color hover:bg-white/30'
                                        }`}
                                    >
                                        Moyen
                                    </button>
                                    <button
                                        onClick={() => setChorusDuration('long')}
                                        className={`px-2 py-1 text-xs rounded transition-all ${
                                            chorusDuration === 'long'
                                                ? 'bg-primary text-on-primary'
                                                : 'bg-white/20 text-base-color hover:bg-white/30'
                                        }`}
                                    >
                                        Long
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inclure des parties instrumentales : Checkbox à gauche, Couronne à droite */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                id="include-instrumental"
                                type="checkbox"
                                checked={includeInstrumentalParts}
                                onChange={e => setIncludeInstrumentalParts(e.target.checked)}
                                disabled={isInstrumentalLocked}
                                className="sr-only peer"
                            />
                            <div className="w-5 h-5 bg-white/50 dark:bg-black/30 border border-slate-400 dark:border-slate-600 rounded-md flex items-center justify-center transition-all duration-200 peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)] peer-disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 transform ${includeInstrumentalParts ? 'scale-100' : 'scale-0'}`}>
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </label>
                        <div className="flex items-center gap-1">
                            <span className={`text-sm text-base-color ${isInstrumentalLocked ? 'opacity-50' : ''}`}>
                                {isFrench ? "Inclure des parties instrumentales" : "Include instrumental parts"}
                            </span>
                            {isInstrumentalLocked && (
                                <button
                                    onClick={user.isAuthenticated ? onUpgradeOpen : onAuthOpen}
                                    title={`Nécessite le plan ${planNeededForInstrumental}`}
                                    className="cursor-pointer flex-shrink-0"
                                >
                                    <CrownIcon />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Groupe droite : Amplifier le Style Prompt (Couronne à gauche, Checkbox à droite) - Centré verticalement */}
                <div className="flex items-center gap-3 ml-auto">
                    <div className="flex items-center gap-1">
                        {![SubscriptionPlan.Pro, SubscriptionPlan.ProAnnual, SubscriptionPlan.Ultimate, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.Business, SubscriptionPlan.BusinessAnnual, SubscriptionPlan.SecretSociety].includes(user.plan) && (
                            <button
                                onClick={user.isAuthenticated ? onUpgradeOpen : onAuthOpen}
                                title={`Nécessite le plan ${plans.find(p => p.id === SubscriptionPlan.Pro)?.name || 'Pro'}`}
                                className="cursor-pointer flex-shrink-0"
                            >
                                <CrownIcon />
                            </button>
                        )}
                        <span className={`text-sm text-base-color ${![SubscriptionPlan.Pro, SubscriptionPlan.ProAnnual, SubscriptionPlan.Ultimate, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.Business, SubscriptionPlan.BusinessAnnual, SubscriptionPlan.SecretSociety].includes(user.plan) ? 'opacity-50' : ''}`}>
                            {isFrench ? "Amplifier le Style Prompt ✨" : "Amplify Style Prompt ✨"}
                        </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            id="amplify-prompt"
                            type="checkbox"
                            checked={amplifyPrompt}
                            onChange={e => setAmplifyPrompt(e.target.checked)}
                            disabled={![SubscriptionPlan.Pro, SubscriptionPlan.ProAnnual, SubscriptionPlan.Ultimate, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.Business, SubscriptionPlan.BusinessAnnual, SubscriptionPlan.SecretSociety].includes(user.plan)}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-white/50 dark:bg-black/30 border border-slate-400 dark:border-slate-600 rounded-md flex items-center justify-center transition-all duration-200 peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)] peer-disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 transform ${amplifyPrompt ? 'scale-100' : 'scale-0'}`}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default StructureControls;
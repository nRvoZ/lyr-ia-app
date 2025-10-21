import React, { useMemo, useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import CustomSelect, { CustomSelectOption } from '../../../src/components/common/CustomSelect';

interface AnimeThemeSelectorProps {
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
}

const AnimeThemeSelector: React.FC<AnimeThemeSelectorProps> = ({ selectedTheme, setSelectedTheme }) => {
    const appData = useContext(DataContext);
    const animeThemes = appData?.animeThemes || [];
    
    const animeOptions: CustomSelectOption<string>[] = useMemo(() => animeThemes.map(theme => ({
        value: theme.name,
        searchValue: `${theme.name} ${theme.styles}`,
        displayValue: <span className="font-medium text-base-color">{theme.name}</span>,
        label: <div className="flex justify-between items-center"><div><span className="font-medium text-base-color">{theme.name}</span></div><span className="text-xs text-muted-color opacity-75">{theme.styles}</span></div>
    })), [animeThemes]);
    
    if (!appData) {
        return <div className="w-full p-2 text-left rounded-lg bg-black/30 border border-slate-600 text-muted-color">Chargement...</div>;
    }
    
    return <CustomSelect placeholder="-- Choisissez un thème --" options={animeOptions} value={selectedTheme} onChange={(name) => setSelectedTheme(name || '')} />;
};

export default AnimeThemeSelector;
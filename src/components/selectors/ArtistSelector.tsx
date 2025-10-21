import React, { useMemo, useContext } from 'react';
import type { Artist, SongStructure } from '../../types';
import { getSuggestedStructureValueForArtist } from '@constants/constants';
import { DataContext } from '../../contexts/DataContext';
import CustomSelect, { CustomSelectOption } from '../../../src/components/common/CustomSelect';

interface ArtistSelectorProps {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  songStructures: SongStructure[];
}

const SpecialTraitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1.5 text-primary-light opacity-90 relative bottom-px">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
    </svg>
);

const ArtistSelector: React.FC<ArtistSelectorProps> = ({ selectedArtist, setSelectedArtist, songStructures }) => {
    const appData = useContext(DataContext);
    
    const artists = appData?.artists || [];

    const getSuggestionText = (artist: Artist) => {
        const suggestedValue = getSuggestedStructureValueForArtist(artist);
        const structure = songStructures.find(s => s.value === suggestedValue);
        return structure ? `💡 ${structure.name.split('(')[0].trim().replace(':', '')}` : '';
    };

    const artistOptions: CustomSelectOption<string>[] = useMemo(() => artists.map(artist => {
        const hasSpecialTraits = artist.specialTraits && artist.specialTraits.length > 0;
        return {
            value: artist.name,
            // Stocker nom et genre séparément pour un filtrage plus précis
            searchValue: `${artist.name}|${artist.genres}`,
            displayValue: (
                <span>
                    <span className="font-medium text-base-color">{artist.name}</span>
                    {hasSpecialTraits && <SpecialTraitIcon />}
                    <span className="text-xs text-muted-color ml-2">{artist.genres}</span>
                </span>
            ),
            label: (
                <div className="flex justify-between items-center">
                    <span>
                        <span className="font-medium text-base-color">{artist.name}</span>
                         {hasSpecialTraits && <SpecialTraitIcon />}
                        <span className="text-xs text-muted-color ml-2">{artist.genres}</span>
                    </span>
                    <span className="text-xs text-primary-light opacity-75">{getSuggestionText(artist)}</span>
                </div>
            )
        };
    }), [songStructures, artists]);
    
    if (!appData) {
        return <div className="w-full p-2 text-left rounded-lg bg-black/30 border border-slate-600 text-muted-color">Chargement des artistes...</div>;
    }

    return <CustomSelect 
                placeholder="-- Choisissez ou recherchez un artiste --" 
                options={artistOptions} 
                value={selectedArtist?.name || null} 
                onChange={(name) => setSelectedArtist(artists.find(a => a.name === name) || null)}
                searchable={true}
                searchPlaceholder="Rechercher par nom ou genre..."
            />;
};

export default ArtistSelector;
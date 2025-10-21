import React, { useState, useMemo, useContext, useRef, useEffect } from 'react';
import type { Artist, SongStructure } from '../../types';
import { getSuggestedStructureValueForArtist } from '@constants/constants';
import { DataContext } from '../../contexts/DataContext';

interface ArtistSearchProps {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  songStructures: SongStructure[];
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-color">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const SpecialTraitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1.5 text-primary-light opacity-90">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
    </svg>
);

const ArtistSearch: React.FC<ArtistSearchProps> = ({ selectedArtist, setSelectedArtist, songStructures }) => {
    const appData = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string>('Tous');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const genreDropdownRef = useRef<HTMLDivElement>(null);
    
    const artists = appData?.artists || [];

    // Extraire tous les genres uniques
    const allGenres = useMemo(() => {
        const genreSet = new Set<string>();
        artists.forEach(artist => {
            const genres = artist.genres.split(',').map(g => g.trim());
            genres.forEach(genre => {
                // Extraire le genre principal (avant le "/")
                const mainGenre = genre.split('/')[0].trim();
                if (mainGenre) genreSet.add(mainGenre);
            });
        });
        return ['Tous', ...Array.from(genreSet).sort()];
    }, [artists]);

    // Filtrer et trier les artistes
    const filteredArtists = useMemo(() => {
        // DÉDUPLIQUER les artistes (certains sont en double dans les fichiers)
        const uniqueArtistsMap = new Map<string, Artist>();
        artists.forEach(artist => {
            if (!uniqueArtistsMap.has(artist.name)) {
                uniqueArtistsMap.set(artist.name, artist);
            }
        });
        
        // Commencer avec les artistes UNIQUES
        let baseArtists = Array.from(uniqueArtistsMap.values());

        // ÉTAPE 1: Filtre par genre (si sélectionné)
        if (selectedGenre !== 'Tous') {
            baseArtists = baseArtists.filter(artist => 
                artist.genres.toLowerCase().includes(selectedGenre.toLowerCase())
            );
        }

        // ÉTAPE 2: Filtre par recherche textuelle - STRICT
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            
            // Séparer en groupes de priorité (STRICTEMENT)
            const nameExactStart: Artist[] = [];      // "John" pour "john"
            const nameWordStart: Artist[] = [];       // "John Williams" pour "williams"
            const genreWordStart: Artist[] = [];      // Genre "Jazz" pour "jazz"

            // Parcourir SEULEMENT les artistes déjà filtrés par genre
            baseArtists.forEach(artist => {
                const artistName = artist.name.toLowerCase();
                const artistGenres = artist.genres.toLowerCase();
                
                // Nettoyer et séparer les mots (retirer la ponctuation)
                const nameWords = artistName.split(/[\s,.-]+/).filter(w => w.length > 0);
                const genreWords = artistGenres.split(/[\s,.-\/]+/).filter(w => w.length > 0);

                // Priorité 1: Le NOM ENTIER commence par la recherche
                if (artistName.startsWith(query)) {
                    nameExactStart.push(artist);
                }
                // Priorité 2: Un MOT du nom commence par la recherche
                else if (nameWords.some(word => word.startsWith(query))) {
                    nameWordStart.push(artist);
                }
                // Priorité 3: Un MOT du GENRE commence par la recherche
                else if (genreWords.some(word => word.startsWith(query))) {
                    genreWordStart.push(artist);
                }
                // Sinon, on ne l'ajoute PAS (artiste écarté)
            });

            // RETOURNER SEULEMENT les artistes qui matchent la recherche
            return [...nameExactStart, ...nameWordStart, ...genreWordStart];
        }

        // Si pas de recherche, retourner tous les artistes (filtrés par genre seulement)
        return baseArtists;
    }, [artists, searchQuery, selectedGenre]);

    const getSuggestionText = (artist: Artist) => {
        const suggestedValue = getSuggestedStructureValueForArtist(artist);
        const structure = songStructures.find(s => s.value === suggestedValue);
        return structure ? `💡 ${structure.name.split('(')[0].trim().replace(':', '')}` : '';
    };

    // Fermer les dropdowns au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target as Node)) {
                setIsGenreDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!appData) {
        return <div className="w-full p-4 text-center rounded-lg bg-black/30 border border-slate-600 text-muted-color">Chargement des artistes...</div>;
    }

    return (
        <div className="w-full relative" ref={dropdownRef}>
            {/* Champ unique tout-en-un */}
            <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-300 dark:border-slate-600 cursor-pointer hover:border-primary hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-2"
            >
                {/* Contenu du champ */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                    <SearchIcon />
                    {selectedArtist ? (
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="font-medium text-base-color truncate">{selectedArtist.name}</span>
                            {selectedArtist.specialTraits && selectedArtist.specialTraits.length > 0 && <SpecialTraitIcon />}
                            <span className="text-xs text-muted-color truncate">• {selectedArtist.genres}</span>
                        </div>
                    ) : (
                        <span className="text-muted-color">Rechercher ou sélectionner un artiste...</span>
                    )}
                </div>
                
                {/* Actions à droite */}
                <div className="flex items-center gap-1">
                    {selectedArtist && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArtist(null);
                            }}
                            className="p-1 rounded-full hover:bg-white/20 hover:scale-110 hover:rotate-90 transition-all duration-300 text-muted-color hover:text-base-color"
                        >
                            <CloseIcon />
                        </button>
                    )}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={`text-muted-color transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl animate-scale-in">
                    {/* Recherche dans le dropdown */}
                    <div className="p-2 border-b border-slate-300 dark:border-slate-700 space-y-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher par nom..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="w-full pl-9 pr-8 py-2 rounded-md bg-white/50 dark:bg-black/30 border border-slate-300 dark:border-slate-600 text-sm text-base-color placeholder-color focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50"
                            />
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <SearchIcon />
                            </div>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 hover:scale-110 hover:rotate-90 transition-all duration-300"
                                >
                                    <CloseIcon />
                                </button>
                            )}
                        </div>
                        
                        {/* Sélecteur de genre avec dropdown */}
                        <div className="relative" ref={genreDropdownRef}>
                            <button
                                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                                className={`w-full text-left p-2.5 rounded-md transition-all duration-300 ${
                                    selectedGenre !== 'Tous'
                                        ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-[1.02]'
                                        : 'hover:bg-primary/10 dark:hover:bg-primary/20 hover:scale-[1.02] hover:shadow-md hover:pl-4'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm font-medium ${selectedGenre !== 'Tous' ? 'text-on-primary' : 'text-base-color'}`}>
                                        {selectedGenre === 'Tous' ? '🎵 Tous les genres' : `🎸 ${selectedGenre}`}
                                    </span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className={`transition-all duration-300 ${isGenreDropdownOpen ? 'rotate-180' : ''} ${selectedGenre !== 'Tous' ? 'text-on-primary' : 'text-primary'}`}
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </button>

                            {/* Dropdown des genres */}
                            {isGenreDropdownOpen && (
                                <div className="absolute z-50 mt-1 w-full rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl animate-scale-in max-h-60 overflow-y-auto custom-scrollbar p-1">
                                    {allGenres.map(genre => {
                                        const isSelected = selectedGenre === genre;
                                        return (
                                            <button
                                                key={genre}
                                                onClick={() => {
                                                    setSelectedGenre(genre);
                                                    setIsGenreDropdownOpen(false);
                                                }}
                                                className={`w-full text-left p-2.5 rounded-md mb-1 transition-all duration-300 ${
                                                    isSelected
                                                        ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-[1.02]'
                                                        : 'hover:bg-primary/10 dark:hover:bg-primary/20 hover:scale-[1.02] hover:shadow-md hover:pl-4'
                                                }`}
                                            >
                                                <span className={`text-sm font-medium ${isSelected ? 'text-on-primary' : 'text-base-color'}`}>
                                                    {genre === 'Tous' ? '🎵 Tous les genres' : `🎸 ${genre}`}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Liste des résultats */}
                    <div className="max-h-80 overflow-y-auto p-1 custom-scrollbar">
                        {filteredArtists.length > 0 ? (
                            filteredArtists.map(artist => {
                                const hasSpecialTraits = artist.specialTraits && artist.specialTraits.length > 0;
                                const isSelected = selectedArtist?.name === artist.name;
                                
                                return (
                                    <button
                                        key={artist.name}
                                        onClick={() => {
                                            setSelectedArtist(artist);
                                            setIsDropdownOpen(false);
                                            setSearchQuery('');
                                            setSelectedGenre('Tous');
                                        }}
                                        className={`w-full text-left p-2.5 rounded-md transition-all duration-300 ${
                                            isSelected
                                                ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-[1.02]'
                                                : 'hover:bg-primary/10 dark:hover:bg-primary/20 hover:scale-[1.02] hover:shadow-md hover:pl-4'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1 mb-0.5">
                                                    <span className={`font-medium text-sm truncate ${isSelected ? 'text-on-primary' : 'text-base-color'}`}>
                                                        {artist.name}
                                                    </span>
                                                    {hasSpecialTraits && <SpecialTraitIcon />}
                                                </div>
                                                <div className={`text-xs truncate ${isSelected ? 'text-on-primary/70' : 'text-muted-color'}`}>
                                                    {artist.genres}
                                                </div>
                                            </div>
                                            <div className={`text-xs whitespace-nowrap ${isSelected ? 'text-on-primary/60' : 'text-primary-light opacity-75'}`}>
                                                {getSuggestionText(artist)}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-muted-color">
                                <div className="flex justify-center mb-2">
                                    <SearchIcon />
                                </div>
                                <p className="text-sm">Aucun artiste trouvé</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistSearch;


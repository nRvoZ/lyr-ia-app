import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-color">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);


export interface CustomSelectOption<T> {
    value: T;
    label: React.ReactNode;
    displayValue?: React.ReactNode;
    searchValue?: string;
}

interface CustomSelectProps<T> {
    options: CustomSelectOption<T>[];
    value: T | null;
    onChange: (value: T | null) => void;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
}

const CustomSelect = <T extends string | number>({ options, value, onChange, placeholder = "Select an option", disabled = false, searchable = false, searchPlaceholder = "Rechercher..." }: CustomSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = useMemo(() => options.find(opt => opt.value === value), [options, value]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    
    useEffect(() => {
        if (isOpen) {
            const selectedIndex = options.findIndex(opt => opt.value === value);
            setActiveIndex(selectedIndex);
            if (searchable) {
                setTimeout(() => searchInputRef.current?.focus(), 0);
            }
        } else {
            setSearchQuery('');
        }
    }, [isOpen, value, options, searchable]);

    const filteredOptions = useMemo(() => {
        if (!searchable || !searchQuery) {
            return options;
        }
        
        const query = searchQuery.toLowerCase().trim();
        
        // Séparer les groupes de résultats par priorité
        const nameStartsMatches: typeof options = [];
        const nameContainsMatches: typeof options = [];
        const genreMatches: typeof options = [];
        
        options.forEach(opt => {
            const searchText = (opt.searchValue || String(opt.value)).toLowerCase();
            
            // Si le format est "nom|genre", séparer les deux parties
            const [name, genres] = searchText.includes('|') 
                ? searchText.split('|') 
                : [searchText, ''];
            
            const nameWords = name.split(' ');
            const genreWords = genres ? genres.split(' ') : [];
            
            // Priorité 1: Le NOM commence par la recherche
            const nameStartsWithQuery = nameWords.some(word => word.startsWith(query));
            
            if (nameStartsWithQuery) {
                // Sous-priorité: le nom entier commence (ex: "Adele" pour "a")
                if (name.startsWith(query)) {
                    nameStartsMatches.unshift(opt);
                } else {
                    nameStartsMatches.push(opt);
                }
            } 
            // Priorité 2: Un mot du GENRE commence par la recherche
            else if (genreWords.some(word => word.startsWith(query))) {
                genreMatches.push(opt);
            }
            // Priorité 3: Le nom CONTIENT la recherche (sans commencer par elle)
            else if (name.includes(query)) {
                nameContainsMatches.push(opt);
            }
        });
        
        // Retourner les résultats triés par priorité
        return [...nameStartsMatches, ...genreMatches, ...nameContainsMatches];
    }, [options, searchQuery, searchable]);

    useEffect(() => {
        setActiveIndex(filteredOptions.length > 0 ? 0 : -1);
    }, [filteredOptions]);

    const handleSelect = (optionValue: T) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) setIsOpen(true);
                setActiveIndex(prev => (prev + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) setIsOpen(true);
                setActiveIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (isOpen) {
                    if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
                        handleSelect(filteredOptions[activeIndex].value);
                    }
                } else {
                    setIsOpen(true);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            case 'Tab':
                 if(isOpen) setIsOpen(false);
                 break;
        }
    };
    
    useEffect(() => {
        if (activeIndex < 0 || !listRef.current) return;
        const activeElement = listRef.current.querySelector<HTMLLIElement>(`[data-index="${activeIndex}"]`);
        activeElement?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={disabled}
                className="w-full p-2 text-left rounded-lg bg-white/50 dark:bg-black/30 border border-slate-300 dark:border-slate-600 text-base-color flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="truncate">
                    {selectedOption ? (selectedOption.displayValue || selectedOption.label) : <span className="text-muted-color">{placeholder}</span>}
                </span>
                <ChevronDownIcon />
            </button>

            {isOpen && !disabled && (
                <div 
                    className="absolute z-50 mt-1 w-full rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex flex-col"
                >
                    {searchable && (
                        <div className="p-2 border-b border-slate-300 dark:border-slate-700 relative">
                             <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-md py-2 pl-9 pr-3 text-sm text-base-color focus:ring-primary focus:border-primary"
                            />
                            <SearchIcon />
                        </div>
                    )}
                    <ul
                        ref={listRef}
                        role="listbox"
                        className="max-h-60 overflow-y-auto p-1"
                    >
                        {filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
                            <li
                                key={option.value}
                                data-index={index}
                                role="option"
                                aria-selected={value === option.value}
                                onClick={() => handleSelect(option.value)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`p-2 rounded-md cursor-pointer transition-colors text-sm ${
                                    activeIndex === index 
                                        ? 'bg-primary text-on-primary' 
                                        : 'hover:bg-primary/20'
                                }`}
                            >
                                {option.label}
                            </li>
                        )) : (
                             <li className="p-2 text-center text-sm text-muted-color">Aucun résultat</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
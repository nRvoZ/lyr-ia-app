import React from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
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
        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/10 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-base-color bg-white/5 dark:bg-black/20 hover:bg-white/10 dark:hover:bg-black/30 transition-colors"
      >
        <span>{title}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 border-t border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
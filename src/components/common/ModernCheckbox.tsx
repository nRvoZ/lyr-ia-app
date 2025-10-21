import React from 'react';

interface ModernCheckboxProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const ModernCheckbox: React.FC<ModernCheckboxProps> = ({ id, label, description, checked, onChange }) => {
  return (
    <>
      <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer group">
        <div className="relative flex items-center">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
            />
            <div className="w-5 h-5 bg-white/50 dark:bg-black/30 border border-slate-400 dark:border-slate-600 rounded-md flex items-center justify-center transition-all duration-200 group-hover:border-slate-500 dark:group-hover:border-slate-400 peer-checked:bg-[var(--color-primary)] peer-checked:border-[var(--color-primary)]">
                <div className={`transition-transform duration-200 transform scale-0 peer-checked:scale-100`}>
                    <CheckIcon />
                </div>
            </div>
        </div>
        <span className="text-sm text-base-color select-none">{label}</span>
      </label>
      {description && (
        <p className="text-xs text-muted-color mt-1 ml-7">{description}</p>
      )}
    </>
  );
};

export default ModernCheckbox;

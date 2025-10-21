import React from 'react';

interface LyricsDisplayProps {
  lyrics: string;
  baseClassName?: string;
  headerClassName?: string;
  lineClassName?: string;
  onCopy?: () => void;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ 
  lyrics, 
  baseClassName = '',
  headerClassName = 'text-primary-light mt-4 mb-2 first:mt-0 font-bold',
  lineClassName = '',
  onCopy
}) => {
  if (!lyrics) return null;

  return (
    <div className={baseClassName} onCopy={onCopy}>
      {lyrics.split('\n').map((line, index) => {
        const trimmedLine = line.trim();
        if (/^\[.*\]$/.test(trimmedLine)) {
          return (
            <strong key={index} className={`block ${headerClassName}`}>
              {trimmedLine}
            </strong>
          );
        } else if (trimmedLine) {
          return <span key={index} className={`block ${lineClassName}`}>{trimmedLine}</span>;
        }
        // Render a non-breaking space for empty lines to maintain some vertical rhythm if needed,
        // but for now we let the header margin handle it.
        return null; 
      })}
    </div>
  );
};

export default LyricsDisplay;
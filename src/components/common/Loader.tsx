
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Génération en cours..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      <p className="text-muted-color text-lg animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
import React, { useState, useRef, useEffect } from 'react';
import { MarketingKitData } from '../../types';
import GlassCard from '../common/GlassCard';

interface MarketingKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  kit: MarketingKitData | null;
}

const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;

const MarketingKitModal: React.FC<MarketingKitModalProps> = ({ isOpen, onClose, kit }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'social' | 'press' | 'bio' | 'visuals'>('social');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) {
        // Reset copied states when modal closes
        setCopiedStates({});
    }
  }, [isOpen]);

  if (!isOpen || !kit) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const TabButton: React.FC<{ label: string; target: typeof activeTab }> = ({ label, target }) => (
    <button
        onClick={() => setActiveTab(target)}
        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === target ? 'bg-primary text-on-primary shadow' : 'text-muted-color hover:bg-white/10'}`}
    >
        {label}
    </button>
  );

  const ContentBlock: React.FC<{ title: string; text: string; id: string; children?: React.ReactNode }> = ({ title, text, id, children }) => (
    <div className="relative p-4 bg-black/20 rounded-lg">
      <h4 className="text-sm font-semibold text-primary-light mb-2">{title}</h4>
      <p className="text-sm text-muted-color whitespace-pre-wrap">{text}</p>
      {children}
      <button
        onClick={() => handleCopy(text, id)}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors"
        title="Copier"
      >
        {copiedStates[id] ? 'Copié !' : <CopyIcon />}
      </button>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={(e) => { if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose(); }}
    >
      <div ref={modalRef} className="w-full max-w-3xl">
        <GlassCard className="p-6 max-h-[90vh] flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-base-color">Votre Kit Marketing</h2>
            <p className="text-muted-color">Contenu généré par l'IA pour promouvoir votre single.</p>
          </div>
          
          <div className="flex space-x-2 rounded-lg bg-black/20 p-1 mb-4">
              <TabButton label="Réseaux Sociaux" target="social" />
              <TabButton label="Presse" target="press" />
              <TabButton label="Biographie" target="bio" />
              <TabButton label="Idées Visuelles" target="visuals" />
          </div>

          <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            {activeTab === 'social' && (
              <div className="space-y-4 animate-fade-in">
                <ContentBlock title="Post Instagram" text={kit.socialMediaPosts.instagram.text} id="insta-text">
                    <p className="mt-2 text-xs text-primary-light font-mono">{kit.socialMediaPosts.instagram.hashtags}</p>
                </ContentBlock>
                 <ContentBlock title="Tweet" text={kit.socialMediaPosts.twitter.text} id="twitter-text">
                     <p className="mt-2 text-xs text-primary-light font-mono">{kit.socialMediaPosts.twitter.hashtags}</p>
                 </ContentBlock>
                 <ContentBlock title="Idée TikTok" text={kit.socialMediaPosts.tiktok.text} id="tiktok-text">
                     <p className="mt-2 text-xs text-primary-light font-mono">{kit.socialMediaPosts.tiktok.hashtags}</p>
                 </ContentBlock>
              </div>
            )}
            {activeTab === 'press' && (
                <div className="animate-fade-in">
                    <ContentBlock title="Communiqué de Presse" text={kit.pressRelease} id="press-release" />
                </div>
            )}
             {activeTab === 'bio' && (
                <div className="animate-fade-in">
                    <ContentBlock title="Biographie d'Artiste (pour ce single)" text={kit.artistBio} id="artist-bio" />
                </div>
            )}
             {activeTab === 'visuals' && (
                <div className="p-4 bg-black/20 rounded-lg animate-fade-in">
                    <h4 className="text-sm font-semibold text-primary-light mb-2">Idées pour Clip / Stories</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-color">
                        {kit.visualIdeas.map((idea, index) => <li key={index}>{idea}</li>)}
                    </ul>
                </div>
             )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg shadow-md transition-all"
            >
              Fermer
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default MarketingKitModal;
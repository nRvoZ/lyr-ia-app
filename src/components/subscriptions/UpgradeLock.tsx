import React from 'react';
import GlassCard from '../common/GlassCard';

interface UpgradeLockProps {
    message: string;
    onUpgrade: () => void;
}

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);


const UpgradeLock: React.FC<UpgradeLockProps> = ({ message, onUpgrade }) => {
    return (
        <GlassCard className="flex items-center justify-center p-10 min-h-[400px]">
            <div className="text-center max-w-md animate-fade-in">
                <div className="mx-auto w-fit p-4 rounded-full bg-primary/20 mb-4 text-primary">
                    <LockIcon />
                </div>
                <h3 className="text-2xl font-bold text-base-color mb-2">Fonctionnalité Verrouillée</h3>
                <p className="text-muted-color mb-6">{message}</p>
                <button
                    onClick={onUpgrade}
                    className="py-3 px-8 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                >
                    Passer au niveau supérieur
                </button>
            </div>
        </GlassCard>
    );
};

export default UpgradeLock;
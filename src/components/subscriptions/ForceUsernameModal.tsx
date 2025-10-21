import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import GlassCard from '../common/GlassCard';

interface ForceUsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForceUsernameModal: React.FC<ForceUsernameModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUsername } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
        setError("Le pseudonyme ne peut pas être vide.");
        return;
    }
    setError('');
    setIsLoading(true);

    try {
        await updateUsername(user.email!, newUsername);
        onClose();
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="w-full max-w-md">
        <GlassCard className="p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-base-color">Choisissez un nouveau pseudonyme</h2>
                <p className="text-muted-color mt-2">
                    Votre pseudonyme a été réinitialisé. Veuillez en choisir un nouveau pour continuer. Ce pseudonyme sera visible par les autres utilisateurs.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <label htmlFor="new-username" className="sr-only">Nouveau pseudonyme</label>
                    <input 
                        id="new-username"
                        type="text" 
                        value={newUsername} 
                        onChange={e => setNewUsername(e.target.value)} 
                        placeholder="Votre nouveau pseudo" 
                        className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" 
                        required 
                    />
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                
                <div className="pt-2">
                    <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
                        {isLoading ? 'Sauvegarde...' : 'Confirmer le pseudonyme'}
                    </button>
                </div>
            </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default ForceUsernameModal;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/SupabaseUserContext';
import GlassCard from '../common/GlassCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { register, login } = useContext(UserContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'login' | 'signup' | '2fa-setup' | '2fa-verify'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2FA states
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [tempSecret, setTempSecret] = useState<string | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const resetState = () => {
    setMode('login');
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setError('');
    setIsLoading(false);
  };

  useEffect(() => {
    // When the modal is closed, reset its internal state to ensure a fresh start next time.
    if (!isOpen) {
      // Use a timer to delay the state reset until after the closing animation has finished.
      const timer = setTimeout(() => {
        resetState();
      }, 300); // Corresponds to animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
          if (mode === 'signup') {
            if (password.length < 6) throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
            if (password !== confirmPassword) throw new Error("Les mots de passe ne correspondent pas.");

            const result = await register(email, password, username);
            if (result.success) {
                onClose();
            } else {
                throw new Error(result.error || 'Erreur lors de l\'inscription');
            }
          } else if (mode === 'login') {
              const result = await login(email, password);
              if (result.success) {
                  onClose();
              } else {
                  throw new Error(result.error || 'Erreur lors de la connexion');
              }
          }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
  };


  
  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const handle2faSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (!twoFactorCode || twoFactorCode.length !== 6) {
        throw new Error('Entrez un code à 6 chiffres.');
      }
      // Placeholder: In a real flow, verify code server-side
      onClose();
    } catch (err: any) {
      setError(err.message || 'Échec de la vérification 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const TabButton: React.FC<{ label: string; currentMode: 'login' | 'signup'; targetMode: 'login' | 'signup'; }> = ({ label, currentMode, targetMode }) => (
    <button
        type="button"
        onMouseDown={(e) => {
            e.preventDefault();
            handleModeChange(targetMode);
        }}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-colors ${currentMode === targetMode ? 'bg-primary text-on-primary shadow' : 'text-muted-color hover:bg-white/10'}`}
    >
        {label}
    </button>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-color mb-1">Adresse e-mail</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-color mb-1">Mot de passe</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
                {isLoading ? 'Chargement...' : 'Connexion'}
            </button>
        </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-muted-color mb-1">Pseudonyme</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Votre pseudo" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-color mb-1">Adresse e-mail</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-color mb-1">Mot de passe</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-color mb-1">Confirmez le mot de passe</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
        </div>
        <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
                {isLoading ? 'Création...' : 'Créer mon compte'}
            </button>
        </div>
    </form>
  );

  const render2faSetup = () => (
      <div className="text-center animate-fade-in">
          <h3 className="text-xl font-bold text-base-color">Sécurisez votre compte</h3>
          <p className="text-muted-color text-sm mt-1 mb-4">Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.).</p>
          {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code 2FA" className="mx-auto rounded-lg" /> : <p>Génération du QR Code...</p>}
          <p className="text-xs text-muted-color mt-4">Ou entrez manuellement cette clé :</p>
          <p className="font-mono p-2 bg-black/20 rounded-md text-sm my-1">{tempSecret}</p>
          
          <form onSubmit={handle2faSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="2fa-code" className="block text-sm font-medium text-muted-color mb-1">Code de vérification</label>
              <input type="text" inputMode="numeric" id="2fa-code" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} placeholder="123456" className="w-full text-center tracking-[0.5em] bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
              {isLoading ? 'Vérification...' : 'Activer & Terminer'}
            </button>
          </form>
      </div>
  );

   const render2faVerify = () => (
      <div className="text-center animate-fade-in">
          <h3 className="text-xl font-bold text-base-color">Vérification Requise</h3>
          <p className="text-muted-color text-sm mt-1 mb-4">Ouvrez votre application d'authentification et entrez le code pour {email}.</p>
          <form onSubmit={handle2faSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="2fa-code-verify" className="block text-sm font-medium text-muted-color mb-1">Code de vérification</label>
              <input type="text" inputMode="numeric" id="2fa-code-verify" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} placeholder="123456" className="w-full text-center tracking-[0.5em] bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color focus:ring-primary focus:border-primary" required />
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50">
              {isLoading ? 'Vérification...' : 'Se connecter'}
            </button>
          </form>
      </div>
  );


  if (!isOpen) return null;

  const is2faStep = mode === '2fa-setup' || mode === '2fa-verify';

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-md">
        <GlassCard className="p-8 max-h-[90vh] overflow-y-auto">
            {!is2faStep && (
              <>
                <div className="text-center mb-6">
                    <img src="https://i.postimg.cc/63RDDQwK/lyria-badge-glowy.png" alt="Lyr-IA Logo" className="mx-auto h-20 w-20 mb-0" />
                    <h2 className="text-3xl font-bold text-base-color">Bienvenue</h2>
                    <p className="text-muted-color">
                        {mode === 'login' ? 'Connectez-vous pour accéder à votre compte.' : 'Créez un compte pour commencer.'}
                    </p>
                </div>
                <div className="flex space-x-2 rounded-lg bg-black/20 p-1 mb-6">
                    <TabButton label="Connexion" currentMode={mode} targetMode="login" />
                    <TabButton label="Inscription" currentMode={mode} targetMode="signup" />
                </div>
              </>
            )}

            {mode === 'login' && renderLoginForm()}
            {mode === 'signup' && renderSignupForm()}
            {mode === '2fa-setup' && render2faSetup()}
            {mode === '2fa-verify' && render2faVerify()}
                
            {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
                
            {!is2faStep && (
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-color">En continuant, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité.</p>
                </div>
            )}
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthModal;

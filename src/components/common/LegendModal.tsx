import React, { useEffect, useRef, useState, useContext } from 'react';
import GlassCard from './GlassCard';
import Accordion from './Accordion';
import { DataContext } from '../../contexts/DataContext';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPixelClick: (e: React.MouseEvent) => void;
}

const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose, onPixelClick }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>('quickstart');
  const { creditCosts } = useContext(DataContext);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen || !creditCosts) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleToggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const DetailItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-4">
      <strong className="text-base-color">{title}</strong>
      <div className="text-sm text-muted-color space-y-2">{children}</div>
    </div>
  );
  
  const Cost: React.FC<{ value: number | string }> = ({ value }) => <span className="font-mono text-primary-light font-semibold">{value}</span>;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-3xl">
        <GlassCard className="p-6 max-h-[90vh] overflow-y-auto relative">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-base-color">Guide Complet de Lyr-IA</h2>
                <p className="text-muted-color">Tout ce que vous devez savoir pour maîtriser la création musicale.</p>
            </div>
            
            <div className="space-y-3">
                <Accordion title="🚀 Démarrage Rapide : L'Inspiration Instantanée" isOpen={openAccordion === 'quickstart'} onToggle={() => handleToggleAccordion('quickstart')}>
                    <p className="text-sm text-muted-color">
                        La barre de texte en haut de l'onglet "Générateur" est le moyen le plus rapide de créer. Décrivez simplement la chanson que vous imaginez (ex: "une chanson rock mélancolique sur un voyage dans l'espace dans le style de David Bowie"). L'IA interprétera votre demande, choisira l'artiste, le thème et les styles les plus pertinents pour générer un résultat en un seul clic.
                    </p>
                </Accordion>

                <Accordion title="🎵 Les Modes de Génération" isOpen={openAccordion === 'modes'} onToggle={() => handleToggleAccordion('modes')}>
                    <div className="text-sm text-muted-color space-y-3">
                        <p>Pour plus de contrôle, utilisez les modes de génération manuels. Chaque mode a une approche différente.</p>
                        <DetailItem title="Descriptif">
                           <p>Le mode le plus libre. Vous définissez un <strong>thème précis</strong>, choisissez une <strong>influence d'artiste</strong>, et pouvez ajouter des styles musicaux pour affiner le résultat.</p>
                        </DetailItem>
                        <DetailItem title="Artiste">
                            <p>Vous n'avez pas de thème ? Choisissez simplement un <strong>artiste</strong>. L'IA inventera un thème et des paroles qui correspondent parfaitement à son univers. Vous pouvez aussi choisir de fusionner son style avec d'autres genres.</p>
                        </DetailItem>
                        <DetailItem title="Personnalisé (IA-Training) ✨ Plan Ultimate">
                           <p>C'est votre studio personnel. Entraînez l'IA à imiter <strong>votre style unique</strong>.</p>
                           <ol className="list-decimal list-inside ml-4 space-y-1 text-xs">
                               <li>Sélectionnez le mode 'Personnalisé'.</li>
                               <li>Choisissez un des 3 profils et cliquez sur 'Éditer'.</li>
                               <li>Donnez un nom à votre profil (ex: "Mon style Rock Poétique").</li>
                               <li>Décrivez votre univers musical, vos thèmes, votre ton.</li>
                               <li><strong>Le plus important :</strong> Collez vos propres textes dans "Exemples de Paroles". Plus il y a de matière, plus l'imitation sera fidèle.</li>
                               <li>Sauvegardez et générez. L'IA produira une chanson qui sonne comme vous !</li>
                           </ol>
                        </DetailItem>
                         <DetailItem title="Instrumental">
                            <p>Créez une piste musicale sans paroles. Idéal pour des fonds sonores ou des instrumentaux. Combinez <strong>styles</strong>, <strong>ambiances</strong> (ex: Cyberpunk, Fantaisie) et <strong>mots-clés</strong>.</p>
                        </DetailItem>
                         <DetailItem title="Anime">
                           <p>Spécialement conçu pour créer des génériques d'ouverture. Choisissez un <strong>anime</strong> dans la liste pour que l'IA s'imprègne de son univers et de son style musical.</p>
                        </DetailItem>
                    </div>
                </Accordion>
                
                 <Accordion title="💎 Fonctionnalités Premium" isOpen={openAccordion === 'premium'} onToggle={() => handleToggleAccordion('premium')}>
                    <div className="text-sm text-muted-color space-y-3">
                        <DetailItem title="Chansons en Rafale (x3) ✨ Plan Ultimate">
                           <p>Un outil de brainstorming puissant. En un clic, générez <strong>trois variations uniques</strong> de votre chanson (paroles et style) pour un coût en crédits avantageux. Les résultats apparaissent dans des onglets, vous permettant de comparer facilement. Parfait pour explorer différentes directions créatives rapidement.</p>
                        </DetailItem>
                        <DetailItem title="Pochettes en Rafale (x4) ✨ Plan Pro">
                           <p>Une fois votre chanson générée, vous pouvez créer <strong>quatre propositions de pochettes d'album</strong> en une seule fois pour ne garder que la meilleure.</p>
                        </DetailItem>
                        <DetailItem title="Kit Marketing ✨ Plan Business">
                            <p>Après avoir généré une chanson et sa pochette, ce bouton apparaît et analyse votre création pour produire un <strong>pack promotionnel complet</strong> : posts pour les réseaux sociaux, communiqué de presse, biographie contextuelle et idées de clips. Un gain de temps immense pour la promotion de votre musique.</p>
                        </DetailItem>
                         <DetailItem title="Analyseur de Style ✨ Plan Pro">
                            <p>Vous adorez le son d'une chanson existante ? Entrez son <strong>titre</strong> et son <strong>artiste</strong> ici. L'IA analysera la chanson et vous fournira un "Style Prompt" détaillé pour recréer cette sonorité dans Suno.</p>
                        </DetailItem>
                    </div>
                </Accordion>

                <Accordion title="🛠️ Outils & Options Avancées" isOpen={openAccordion === 'tools'} onToggle={() => handleToggleAccordion('tools')}>
                    <div className="text-sm text-muted-color space-y-3">
                        <p>Prenez le contrôle total de votre création avec ces outils puissants.</p>
                        <DetailItem title="Contrôle de la Structure (Auto / Manuel / Avancé)">
                            <p><strong>Auto :</strong> L'IA choisit la structure la plus pertinente pour l'artiste ou le genre que vous avez sélectionné (indiqué par 💡).</p>
                            <p><strong>Manuel :</strong> (Plan Créateur+) Choisissez parmi une liste de structures prédéfinies pour guider l'IA.</p>
                            <p><strong>Avancé :</strong> (Plan Pro+) Devenez un architecte musical. Construisez votre propre structure de A à Z en ajoutant des 'briques' (Couplet, Refrain, Pont, etc.).</p>
                        </DetailItem>
                        <DetailItem title="Caractéristiques Spéciales">
                            <p>Pour certains artistes, vous verrez apparaître des options uniques (ex: "Voix Vocoder" pour Daft Punk). Celles-ci permettent d'activer des traits stylistiques très spécifiques pour des résultats encore plus authentiques. Attention, elles ont un coût additionnel en crédits.</p>
                        </DetailItem>
                        <DetailItem title="L'Éditeur">
                            <p>L'Éditeur est votre suite de post-production. Il contient trois outils :</p>
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>Générer Image :</strong> Vous n'avez pas d'inspiration pour une pochette ? Collez simplement vos paroles et l'IA créera une image à partir de leur thème.</li>
                                <li><strong>Modifier Image :</strong> (Plan Créateur+) Téléchargez n'importe quelle image (générée par Lyr-IA ou la vôtre) et modifiez-la avec un simple prompt (ex: "ajoute un ciel étoilé", "transforme-le en dessin animé").</li>
                                <li><strong>Modifier Paroles :</strong> (Plan Créateur+) Peaufinez vos textes. Le plus : double-cliquez sur un mot pour faire apparaître un <strong>dictionnaire de rimes</strong> et trouver l'inspiration.</li>
                            </ul>
                        </DetailItem>
                    </div>
                </Accordion>

                 <Accordion title="👤 Mon Espace (Profil & Historique)" isOpen={openAccordion === 'account'} onToggle={() => handleToggleAccordion('account')}>
                    <div className="text-sm text-muted-color space-y-3">
                        <p>Votre 'Espace' est votre hub personnel. Il est accessible en cliquant sur votre avatar en haut à droite.</p>
                        <DetailItem title="Profil">
                            <ul className="list-disc list-inside ml-4">
                                <li>Gérez votre pseudonyme, votre photo de profil et le titre que vous affichez (débloqué via les succès).</li>
                                <li>C'est aussi ici que vous pouvez gérer votre abonnement ou vous déconnecter.</li>
                           </ul>
                        </DetailItem>
                        <DetailItem title="Historique">
                            <ul className="list-disc list-inside ml-4">
                                <li>Retrouvez toutes vos créations passées.</li>
                                <li>Rechargez n'importe quelle génération dans le 'Générateur' pour la continuer ou la modifier.</li>
                                <li>Supprimez les créations que vous ne souhaitez plus conserver.</li>
                                <li><strong>Demande de remboursement :</strong> Si une génération présente un défaut technique (ex: mauvais formatage) et que vous ne l'avez PAS copiée, vous pouvez demander un remboursement de crédits.</li>
                           </ul>
                        </DetailItem>
                    </div>
                </Accordion>

                 <Accordion title="💳 Abonnements & Packs de Crédits" isOpen={openAccordion === 'subscriptions'} onToggle={() => handleToggleAccordion('subscriptions')}>
                    <div className="text-sm text-muted-color space-y-3">
                        <p>Lyr-IA fonctionne avec un système de crédits pour les actions d'IA. Il y a deux manières d'en obtenir :</p>
                        <DetailItem title="Abonnements (Mensuels / Annuels)">
                           <p>La meilleure façon de profiter de Lyr-IA. Chaque mois, votre compte est rechargé en crédits et vous débloquez des fonctionnalités exclusives en fonction de votre plan. Les plans annuels offrent une réduction équivalente à deux mois gratuits.</p>
                        </DetailItem>
                        <DetailItem title="Packs de Crédits">
                            <p>Besoin d'un coup de pouce ponctuel ? Achetez un pack de crédits sans engagement. Idéal si vous avez un gros projet mais ne souhaitez pas vous abonner.</p>
                        </DetailItem>
                    </div>
                </Accordion>

                <Accordion title="🪙 Crédits & Coûts des Actions" isOpen={openAccordion === 'credits'} onToggle={() => handleToggleAccordion('credits')}>
                   <div className="text-sm text-muted-color space-y-3">
                        <p>Chaque action qui fait appel à l'IA consomme des crédits. Voici un résumé des coûts :</p>
                        <ul className="list-disc list-inside mt-2 ml-4 space-y-2 text-xs">
                            <li>Génération de texte (Descriptif, Artiste, Anime, Instrumental) : <Cost value={creditCosts.descriptive} /> crédits</li>
                            <li>Analyseur de Style : <Cost value={creditCosts.analyzer} /> crédits</li>
                            <li>Génération de Pochette d'album (x1) : <Cost value={creditCosts.albumArt} /> crédits</li>
                            <li>Pochettes en Rafale (x4) : <Cost value={creditCosts.burstAlbumArt} /> crédits</li>
                            <li>Chansons en Rafale (x3) : <Cost value={creditCosts.burstSong} /> crédits</li>
                            <li>IA-Training (Profil Perso) : <Cost value={creditCosts.personalized} /> crédits</li>
                            <li>Génération de Kit Marketing : <Cost value={creditCosts.marketingKit} /> crédits</li>
                            <li>Activation d'une Caractéristique Spéciale : +<Cost value={creditCosts.specialTrait} /> crédits par trait</li>
                            <li>Options supplémentaires (styles, ambiances) : +<Cost value={creditCosts.extraStyle} /> crédits par option au-delà de la limite gratuite</li>
                            <li>Éditeur d'image & de paroles : <Cost value="Gratuit" /> pour les abonnés</li>
                        </ul>
                        <p className="text-xs italic">Les coûts sont sujets à changement. Consultez toujours le coût affiché sur le bouton de génération avant de lancer une action.</p>
                    </div>
                </Accordion>
                
                <Accordion title="🏆 Succès & Récompenses" isOpen={openAccordion === 'achievements'} onToggle={() => handleToggleAccordion('achievements')}>
                    <div className="text-sm text-muted-color space-y-3">
                       Lyr-IA intègre un système de succès pour récompenser votre créativité et votre exploration.
                        <DetailItem title="Comment ça marche ?">
                          <div>Utilisez simplement Lyr-IA ! La plupart des succès se débloquent en générant des chansons, en explorant les fonctionnalités ou en relevant des défis créatifs. Certains succès sont{' '}
                            <span
                                onClick={onPixelClick}
                                className="cursor-pointer font-semibold hover:text-primary-light transition-colors"
                                title="Hmm..."
                            >
                                secrets
                            </span>
                            {' '}et ne se révèlent qu'une fois débloqués !
                            </div>
                        </DetailItem>
                        <DetailItem title="Récompenses">
                           <div>En débloquant des succès, vous pouvez réclamer des récompenses comme des <strong>Crédits (🪙)</strong> supplémentaires ou des <strong>Titres exclusifs</strong> à afficher sur votre profil.</div>
                        </DetailItem>
                    </div>
                </Accordion>

            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg shadow-md transition-all"
                >
                    J'ai compris, c'est parti !
                </button>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LegendModal;
